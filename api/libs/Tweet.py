import tweepy
from utils.TextDecoder import addSymbolHash
from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="MyApp")
import requests

class Tweet:
    '''
        Basic data in raw that comes from tweepy lib

        Static data from Stream tweepy

        ### Attributes
        * user_name:str
        * user_verified:bool
        * tweet_text:str
        * user_loc:str | dict
        * tweet_id:str
        * source:str
        * hashtags:list
        * mentiongs:int
    '''
    def __init__(self, 
                    user_name = '',
                    user_verified = False,
                    tweet_text = '',
                    user_loc = '',
                    tweet_id = '',
                    source = '',
                    hashtags = [],
                    mentions = 0
                ):

        self.user_name:str = user_name
        self.user_verified:bool = user_verified
        self.tweet_text:str = tweet_text
        self.user_loc:str | dict = user_loc
        self.tweet_id:str = tweet_id
        self.source:str = source
        self.hashtags:list = hashtags
        self.mentiongs:int = mentions


class TweetParser(Tweet):
    '''
        Take the basic information in a structure @Tweet object

        And analyse the missing data.

        ### Attributes
        * user_name:str
        * user_verified:bool
        * tweet_text:str
        * user_loc:str | dict
        * tweet_id:str
        * source:str
        * hashtags:list
        * mentiongs:int
        * sentiment:str
    '''
    def __init__(self, user_name='', user_verified=False, tweet_text='', user_loc='', tweet_id='', source='', hashtags=[], mentions=0):
        super().__init__(user_name, user_verified, tweet_text, user_loc, tweet_id, source, hashtags, mentions)
        
        self.sentiment:str = ''

        self.__identify_sentiment()

        self.__identify_location()

        self.__identify_source()

    
    def __identify_sentiment(self, ):
        pass

    
    def __identify_location(self, ):
        '''
            Use Geopy to identify where the place is
            and then asign that value in the user location
            if something went wrong it will past a default location.
        '''
        try:
            location = geolocator.geocode(self.user_loc)
            self.user_loc = location # type: ignore #{'lat':location.latitude, 'lon':location.longitude}

        except:
            self.user_loc = {'lat':47.0000, 'lon':-87.30020}
    
    
    def __identify_source(self, ):
        '''
            The main task of this function is to identify
            which device comes from the tweet across the
            source parameter, it will take the best option
            for the tweet.
        '''
        categories = ['iOs', 'Android', 'Web']

        catalog = { 'iphone':categories[0], 'mac':categories[0], 'ios':categories[0],
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
            self.source = 'Web'


class HashtagStream(tweepy.Stream):
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
                            user_name=status.user.name,
                            user_verified=status.user.verified,
                            tweet_text=status.text,
                            user_loc=status.user.location,
                            tweet_id=status.id_str,
                            source=status.source, 
                            hashtags=hashtags,
                            mentions=mentions
                        )
                        
        print(tweet_data.__dict__)
