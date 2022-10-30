
import colorama

class Tweet:
    def __init__(self, 
                user_name = '',
                user_verified = False,
                tweet_text = '',
                user_loc = '',
                tweet_id = ''
                ):

        self.user_name:str = user_name
        self.user_verified:bool = user_verified
        self.tweet_text:str = tweet_text
        self.user_loc:str | dict = user_loc
        self.tweet_id:str = tweet_id


class TweetParser(Tweet):
    def __init__(self, user_name='', user_verified=False, tweet_text='', user_loc='', tweet_id=''):
        super().__init__(user_name, user_verified, tweet_text, user_loc, tweet_id)
        self.user_loc:str | dict = {}
        self.hashtags:list = []
        self.sentiment:str = ''
    

tw = TweetParser('Juan',
                True, 
                'Hola como estas',
                'Merida Yucatan',
                '1909011'
                )


assert tw.__dict__ == {'user_name': 'Juan', 'user_verified': True, 'tweet_text': 'Hola como estas', 'user_loc': {}, 'tweet_id': '1909011', 'hashtags': [], 'sentiment': ''},\
    colorama.Fore.RED+'Something went WRONG!'
print(colorama.Fore.GREEN+'Everything went GOOD!')
print(tw.__dict__)
