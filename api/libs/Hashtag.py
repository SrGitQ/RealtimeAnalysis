class HashtagArticle:
    '''
        `IMPORTANT! This object is usually used in Google Cloud Functions`

        It is an object that takes the data in a structure
        object and store all the important information about
        a hashtag on twitter, given the basic information of
        any tweet it will be analyzed and the whole article
        analysis will change with the best performance possible.

        ## > __init__ call
        Takes a dictionary that has the same dict structure of
        and hashtag article and will replace the default
        information posted. This allow future updates in the article.

        ## > Attributes
        * hashtag: The current topic hastag `"#Hashtag"`.
        * tweets_count: The total number of tweets.
        * users_list: List of all the users.
        * users_count: Number of users in the `users_list` parameter.
        * hashtags: A list with all the hashtags.
        * hashtags_count: Number of hashtags in the `hashtags` parameter.
        * hashtag_network: A dict with node and links of the hashtag network.
        * mentions: All the mentions in the text of each tweet.
        * locations: All the locations with lat and lon in a dict structure.
        * locations_count: Number of all the locations found.
        * raw: List with all the tweet objects.
        * devices: The general dict count of devices for the whole analysis in three categories.
        * sentimen_count: The general dict douct of the sentiment analysis counting for each one.
        * sentiment_average: The same structure of sentiment count, but calculate the average below 100% instead.
        * sentiment_timeline: A list of the sentiment aim line.
        * verified_count: Number of verified counts found.

        ## > Methods
        - insertTweet()
        - amendData()

    '''
    def __init__(self, data:dict|None=None):
        self.hashtag:str = ''
        self.tweets_count:int = 0
        self.users_list:list = []
        self.users_count:int = 0
        self.hashtags:list = []
        self.hashtags_count:int = 0
        self.hashtag_network:dict = {}
        self.mentions:int = 0
        self.locations:list = []
        self.locations_count:int = 0
        self.raw:list = []
        self.devices:dict = {}
        self.sentimen_count:dict = {}
        self.sentiment_average:dict = {}
        self.sentiment_timeline:list = []
        self.verified_count:int = 0

        if data:
            self.amendData(data)

    def insertTweet(self, tweet:dict):
        pass

    def amendData(self, data:dict):
        pass

