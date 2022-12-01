from libs.Tweet import TweetParser
from utils.TextDecoder import addSymbolHash

class HashtagArticle:
    '''
        `IMPORTANT! This object is usually used in Google Cloud Functions`

        It is an object that takes the data in a structure
        object and store all the important information about
        a hashtag on twitter, given the basic information of
        any tweet it will be analyzed and the whole article
        analysis will change with the best performance possible.

        ### __init__ call
        Takes a dictionary that has the same dict structure of
        and hashtag article and will replace the default
        information posted. This allow future updates in the article.

        ### Attributes
        
        :hashtag: The current topic hastag `"#Hashtag"`.
        
        :tweets_count: The total number of tweets.
        
        :users_list: List of all the users.
        
        :users_count: Number of users in the `users_list` parameter.
        
        :hashtags: A list with all the hashtags.
        
        :hashtags_count: Number of hashtags in the `hashtags` parameter.
        
        :hashtag_links: A dict with node and links of the hashtag network.
        
        :mentions: All the mentions in the text of each tweet.
        
        :locations: All the locations with lat and lon in a dict structure.
        
        :locations_count: Number of all the locations found.
        
        :raw: List with all the tweet objects.
        
        :devices: The general dict count of devices for the whole analysis in three categories.
        
        :sentiment_count: The general dict douct of the sentiment analysis counting for each one.
        
        :sentiment_average: The same structure of sentiment count, but calculate the average below 100% instead.
        
        :sentiment_timeline: A list of the sentiment aim line.
        
        :verified_count: Number of verified counts found.

        ### Methods
        
        :insertTweet()
        
        :amendData()

    '''
    def __init__(self, data:dict=None):
        self.hashtag:str = ''
        self.tweets_count:int = 0
        self.users_list:list[str] = []
        self.users_count:int = 0
        self.hashtags:list[str] = []
        self.hashtags_count:int = 0
        self.hashtag_links:list[dict[str, str]] = []
        self.mentions:int = 0
        self.locations:list[dict[str, float]] = []
        self.locations_count:int = 0
        self.raw:list[dict[str, str | list | int]] = []
        self.devices:dict[str,int] = {
            'ios':0,
            'android':0,
            'web':0
        }
        self.sentiment_count:dict[str, int] = {
            'positive':0,
            'neutral':0,
            'negative':0
        }
        self.sentiment_average:dict[str, float] = {
            'positive':0.0,
            'neutral':0.0,
            'negative':0.0
        }
        self.sentiment_timeline:list[dict[str, float]] = []
        self.verified_count:int = 0

        self.amendData(data) if data else None
        
        self.__normalize_article()
    

    def __normalize_article(self, ):
        self.hashtag = self.hashtag.lower()
        if addSymbolHash(self.hashtag) not in self.hashtags:
            self.hashtags.append(addSymbolHash(self.hashtag))
            self.hashtags_count += 1
        


    def insertTweet(self, tweet:dict):
        '''
            After analyse the tweet it will add the information
            to the current status and save the tweet in raw.

            ### Parameters
            :tweet:dict
        '''
        tweet_fit = TweetParser(**tweet)
        
        # tweets_count
        self.tweets_count += 1

        # users_list and users_count
        if tweet_fit.user_name not in self.users_list:
            self.users_list.append(tweet_fit.user_name)
            self.users_count += 1

        # hashtags, hashtags_count and hashtag_links
        for hashtag in tweet_fit.hashtags:
            hashtag = hashtag.lower()
            if hashtag not in self.hashtags and len(hashtag) > 1:
                # append the hashtag node
                self.hashtags.append(hashtag)
                self.hashtags_count += 1
                # append the hashtag -> hashtag topic link
                self.hashtag_links.append({'source':addSymbolHash(self.hashtag), 'target': hashtag})
                # make links between them
                for hashtag_linked in tweet_fit.hashtags:
                    if hashtag_linked != hashtag:
                        self.hashtag_links.append({'source': hashtag_linked, 'target':hashtag})

        # mentions
        self.mentions += tweet_fit.mentions

        # locations and locations_count
        if tweet_fit.user_loc not in self.locations and tweet_fit.user_loc != {'lat':47.0000, 'lon':-87.30020}:
            self.locations.append(tweet_fit.user_loc)
            self.locations_count += 1
 
        # raw
        self.raw.append(tweet_fit.__dict__)
 
        # devices
        self.devices[tweet_fit.source] += 1

        # sentimen_count
        self.sentiment_count[tweet_fit.sentiment] += 1
 
        # sentiment_average
        self.sentiment_average = {
            'positive': self.sentiment_count['positive'] / self.tweets_count,
            'neutral': self.sentiment_count['neutral'] / self.tweets_count,
            'negative': self.sentiment_count['negative'] / self.tweets_count
        }
 
        # sentiment_timeline
        self.sentiment_timeline.append(self.sentiment_average)
 
        # verified_count
        if tweet_fit.user_verified:
            self.verified_count += 1
        
        self.__normalize_article()


    def amendData(self, data:dict):
        '''
            It will replace the default values of the object
            with the current values.
        '''
        [setattr(self, key, data[key]) for key in data]

