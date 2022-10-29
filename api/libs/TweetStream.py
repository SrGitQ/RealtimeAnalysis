import tweepy


class FreeStream(tweepy.Stream):
    def on_connect(self,):
        print('streaming connection on route')


    def on_status(self, tweet):
        print(tweet)
