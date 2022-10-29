import tweepy

from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="MyApp")


class FreeStream(tweepy.Stream):
    def on_connect(self,):
        print('streaming connection on route')


    def on_status(self, tweet):
        print(tweet)

        # try:
        #     location = geolocator.geocode('')
        #     print(location.latitude, location.longitude)   # type: ignore
        # except:
        #     print('shut down')
