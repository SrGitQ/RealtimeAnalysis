

import tweepy
from tweepy import Stream
from google.cloud import pubsub_v1
import datetime
import os
import json
from geopy.geocoders import Nominatim
import base64
import requests


geolocator = Nominatim(user_agent="MyApp")

# PUBISHING TWEETS
def publish(client, pubsub_topic, data_lines):
    """Publish to the given pubsub topic."""
    messages = []

    for line in data_lines:
        messages.append({'data': line})

    body = {'messages':messages}

    str_body = json.dumps(body)
    data_encoded = str_body.encode("utf-8")
    pubsub_message = data_encoded.decode('utf-8', 'replace')
    client.publish(topic=pubsub_topic, data=data_encoded)
    print(type(pubsub_message),pubsub_message,'\n\n')


# LISTENER CLASS
class Listener(Stream):

	# client = None#pubsub_v1.PublisherClient()
	topic = None

	tweets = []
	batch_size = 1
	total_tweets = 1000
	count = 0

	# def write_to_pubsub(self, tweets):
	# 	self.pubsub_topic = self.client.topic_path("twitter-streaming-365514", "example")
	# 	publish(self.client, self.pubsub_topic, tweets)

	def on_status(self, status):
		ruled = requests.get('http://localhost:5000/stream_ruled').json()['ruled']
		if not ruled:
			self.disconnect()

		# User information
		user_name = status.user.name
		user_screen_name = status.user.screen_name
		user_followers = status.user.followers_count
		user_friends = status.user.friends_count
		user_loc = status.user.location	
		try:
			user_loc_lat_lon = geolocator.geocode(user_loc)
		except:
			user_loc_lat_lon = 'California USA'	
		if type(user_loc_lat_lon) == type(None):
			user_lat =  "44.933143"
			user_long = "7.540121"
		else:
			user_lat =  str(user_loc_lat_lon.latitude)
			user_long = str(user_loc_lat_lon.longitude)	
		user_bio = status.user.description
		user_verified = status.user.verified	
		# Tweet details
		created_at = status.created_at.isoformat()
		id_str = status.id_str
		text = status.text
		source = status.source
		tweet_like_count = status.favorite_count
		tweet_reply_count = status.retweet_count

		# Creating a new tweet dict
		new_tweet = {'tweet_id':id_str,
					'topic':self.topic,
		            'user_name':user_name,
		            'user_screen_name':user_screen_name,
		            'user_followers':user_followers,
		            'user_friends': user_friends,
		            'user_loc_code': user_loc,
		            'user_lat': user_lat,
		            'user_lon': user_long,
		            'user_bio': user_bio,
		            'user_verified': user_verified,
		            'tweet_text': text,
		            'created_at':created_at,
		            'tweet_like_count': tweet_like_count,
		            'tweet_reply_count': tweet_reply_count,
		            'source': source}	
		requests.post('https://function-3-iy4drk2okq-ue.a.run.app', json=new_tweet)
		# Appending dict to the list
		# self.tweets.append(new_tweet)	
		# # Verifiying the size of the batch
		# if len(self.tweets) >= self.batch_size:
		# 	# Pubishing the twet
			
		# 	# self.write_to_pubsub(self.tweets)

		# 	self.tweets = []	
		self.count += 1
		if self.count >= self.total_tweets:
			return False	
		if (self.count % 5) == 0:
			print("count is: {} at {}".format(self.count, datetime.datetime.now()))
        

# if __name__ == '__main__':

#     stream_tweet = Linstener(api_key, api_key_secret, access_token, access_token_secret)
	
#     keywords = ['Shakira']
#     stream_tweet.filter(track=keywords,languages=['es'])



"""
import base64
import json
from google.cloud import bigquery
import re
import requests

API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-xlm-roberta-base-sentiment"
headers = {"Authorization": f"Bearer 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"}

global hash_list
hash_list = []

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

def RoverTa(tweet):

  output = query({
    "inputs": tweet,
  })

  max_score = max([x['score'] for x in output[0]])
  label = [x['label'] for x in output[0] if x['score'] == max_score][0]

  print(max_score,label)
  return max_score,label

def getHashtags(text):
  hashtags = re.findall('[#]\w+',text)
  if len(hashtags) != 0:
    hash_list.append(hashtags)
    text = re.sub('[#]\w+','',text)
    
  return text

def tweetCleaner(tweet):
  """
  Function to clean the tweet texts
  """
  print("ORIGINAL:",tweet)

  # Emojis and emoticons removal
  emoji_pattern = re.compile("["
  u"\U0001F600-\U0001F64F"  # emoticons
  u"\U0001F300-\U0001F5FF"  # symbols & pictographs
  u"\U0001F680-\U0001F6FF"  # transport & map symbols
  u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                      "]+", flags=re.UNICODE)

  tweet = getHashtags(tweet) # Get all hashtags on the text
  tweet = re.sub('[RT]','',tweet) # Remove RT: Retweet
  tweet = re.sub('www\S+', '', tweet) # Remove website domain
  tweet = re.sub('http\S+', '', tweet) # Remove links
  tweet = re.sub('@[^\s]+', '', tweet) # Remove @username
  tweet = emoji_pattern.sub('', tweet) # Remove emojis and emoticons
  tweet = re.sub('\W+', ' ',tweet) #Remove all the characters that are not letters or numbers
  tweet = re.sub('[\s]+', ' ', tweet) #Remove aditional white spaces
  

  tweet = tweet.lower() # lower case
  print("CLEANED:",tweet)
  return tweet

def write_tweets_to_bq(dataset_id, table_id, tweets):

    client = bigquery.Client()
    dataset_ref = client.dataset(dataset_id)
    table_ref = dataset_ref.table(table_id)
    table = client.get_table(table_ref)

    client.insert_rows(table, tweets)


def hello_pubsub(event,context):


    try:
        data = event['data']
        stream1 = base64.b64decode(data).decode('utf-8')
        
        stream_dict = json.loads(stream1)
        print("dict message :", stream_dict)
        
        tweets = []
        for tweet in stream_dict["messages"]:
            twt = tweet["data"]

            # Cleaning the text and replacing it by the original
            txt_cleaned = tweetCleaner(twt['tweet_text'])
            twt['tweet_text'] = txt_cleaned

            # Getting the sentiment label and score from XML-RoBerTA
            twt_score,twt_label = RoverTa(txt_cleaned)
            twt['sentiment_label'] = twt_label
            twt['sentiment_score'] = twt_score
            
            tweets.append(twt)

        dataset_id = "tweets_tracking"
        table_id = "shakira_table"

        write_tweets_to_bq(dataset_id, table_id, tweets)
     
    except:
        print("cannot read it")
    
      

"""
