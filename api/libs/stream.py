import tweepy
import requests


class Tweet:
    '''
        Basic data in raw that comes from tweepy lib

        Static data from Stream tweepy

        ### Attributes

        :topic:str
        
        :user_name:str
        
        :user_verified:bool
        
        :tweet_text:str
        
        :user_loc:str | dict
        
        :tweet_id:str
        
        :source:str
        
        :hashtags:list
        
        :mentions:int
    '''
    def __init__(self,
        topic = '',
        user_name = '',
        user_verified = False,
        tweet_text = '',
        user_loc = '',
        tweet_id = '',
        source = '',
        hashtags = [],
        mentions = 0
    ):
        self.topic:str = topic
        self.user_name:str = user_name
        self.user_verified:bool = user_verified
        self.tweet_text:str = tweet_text
        self.user_loc:str | dict = user_loc
        self.tweet_id:str = tweet_id
        self.source:str = source
        self.hashtags:list[str] = hashtags
        self.mentions:int = mentions


class HashtagSimpleStream(tweepy.Stream):
    topic = ''

    def on_connect(self,):
        print('streaming connection on route')

    def on_status(self, status):

        if 'hashtags' in status.entities:
            hashtags = status.entities['hashtags']
        else:
            hashtags = []
        
        if 'user_mentions' in status.entities:
            mentions = len(status.entities['user_mentions'])
        else:
            mentions = 0
    
        tweet_data = Tweet(
            topic=self.topic,
            user_name=status.user.name,
            user_verified=status.user.verified,
            tweet_text=status.text,
            user_loc=status.user.location,
            tweet_id=status.id_str,
            source=status.source, 
            hashtags=hashtags,
            mentions=mentions
        )

        def send_data(tweet:dict) -> bool:
            try:
                # code to execute
                return requests.post('https://function-3-iy4drk2okq-ue.a.run.app', json=tweet)
                # MODIFY here we can call the query

            except KeyError:
                print(KeyError)

            finally:
                return False

        # send data
        send_data(tweet_data.__dict__)
        
        print(tweet_data.__dict__)


if __name__ == '__main__':
    from keys import *
    stream = HashtagSimpleStream(API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

    # MODIFY
    topics = ['Messi']

    stream.filter(track=topics, languages=['en', 'es'])
