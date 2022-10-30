import tweepy
from utils.TextDecoder import addSymbolHash

class Tweet:
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
    def __init__(self, user_name='', user_verified=False, tweet_text='', user_loc='', tweet_id='', source='', hashtags = [], mentions = 0):
        super().__init__(user_name, user_verified, tweet_text, user_loc, tweet_id, source, hashtags, mentions)
        self.user_loc:str | dict = {}
        self.sentiment:str = ''


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

        # try:
        #     location = geolocator.geocode('')
        #     print(location.latitude, location.longitude)   # type: ignore
        # except:
        #     print('shut down')

# from geopy.geocoders import Nominatim
# geolocator = Nominatim(user_agent="MyApp")
