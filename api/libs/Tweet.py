import tweepy
import requests
from utils.TextDecoder import addSymbolHash
from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="MyApp")

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


class TweetParser(Tweet):
    '''
        Take the basic information in a structure @Tweet object

        And analyse the missing data.

        ### Attributes
        
        :topic:str
        
        :user_name:str
        
        :user_verified:bool
        
        :tweet_text:str
        
        :user_loc:dict
        
        :tweet_id:str
        
        :source:str
        
        :hashtags:list
        
        :mentions:int
        
        :sentiment:str
    '''
    def __init__(self, topic='', user_name='', user_verified=False, tweet_text='', user_loc='', tweet_id='', source='', hashtags=[], mentions=0):
        super().__init__(topic, user_name, user_verified, tweet_text, user_loc, tweet_id, source, hashtags, mentions)

        self.sentiment:str = ''

        self.__normalize_tweet()

        self.__identify_sentiment()

        self.__identify_location()

        self.__identify_source()
    

    def __normalize_tweet(self, ):
        self.topic = self.topic.lower()
        self.user_name = self.user_name.lower()
        self.tweet_text = self.tweet_text.lower()
        self.source = self.source.lower()
        self.hashtags = [hashtag.lower() for hashtag in self.hashtags]

    
    def __identify_sentiment(self, ):
        '''
            This use the API of RoverTa to identify
            which sentiment domain the text of the tweet.
        '''
        from keys import ROVERTA
        URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-xlm-roberta-base-sentiment"
        headers = {"Authorization": ROVERTA}

        # analyse the sentiment
        data = requests.post(URL, headers=headers, json={"inputs": self.tweet_text}).json()

        # sort indexes for sentiment score
        max_score = max([x['score'] for x in data[0]])
        
        # get the label  and asign
        self.sentiment = [x['label'] for x in data[0] if x['score'] == max_score][0].lower()
    

    def __identify_location(self, ):
        '''
            Use Geopy to identify where the place is
            and then asign that value in the user location
            if something went wrong it will past a default location.
        '''
        try:
            location = geolocator.geocode(self.user_loc)
            self.user_loc:dict[str, float] = {'lat':location.latitude, 'lon':location.longitude} # type: ignore

        except:
            self.user_loc:dict[str, float] = {'lat':47.0000, 'lon':-87.30020}
    
    
    def __identify_source(self, ):
        '''
            The main task of this function is to identify
            which device comes from the tweet across the
            source parameter, it will take the best option
            for the tweet.
        '''
        categories = ['ios', 'android', 'web']

        catalog = { 
            'iphone':categories[0], 'mac':categories[0], 'ios':categories[0],
            'android':categories[1], 'samsung':categories[1],
            'default':categories[2]
        }

        # iterate over all categories and devices until it find one
        for cat in catalog:
            if cat in self.source:
                self.source = catalog[cat]
                break

        else:
            # else it will asign 'Web' category as default
            self.source = 'web'


class HashtagStream(tweepy.Stream):
    topic = ''

    def on_connect(self,):
        print('streaming connection on route')


    def on_status(self, status):

        if 'hashtags' in status.entities:
            hashtags = [addSymbolHash(hash['text']) for hash in status.entities['hashtags']]
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
        requests.post('https://function-3-iy4drk2okq-ue.a.run.app', json=tweet_data.__dict__)
        print('tweet_data.__dict__')
