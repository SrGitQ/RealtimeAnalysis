from flask import Flask
from flask_cors import CORS, cross_origin
import requests
from keys import *
from libs.Tweet import HashtagStream
from libs.Hashtag import HashtagArticle
from utils.TextDecoder import addSymbolHash


#----------- App configuration -----------#
# flask app
app = Flask(__name__)

# cors configuration
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

# stream
stream = HashtagStream(API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)


#-------------- App routes --------------#
# variables during the life cycle
style = '<style>body{background-color:black;color:white}</style>'       #black style
current_topic = ''

# index
@app.route('/')
def index():

    return style+'Hello, World!'


# put a hashtag to search
@app.route('/hash/<hashtag>')
def setHash(hashtag):
    hashtag = addSymbolHash(hashtag)

    global current_topic
    current_topic = hashtag
    stream.topic = current_topic.replace('#', '')
    stream.filter(track=[hashtag], threaded=True, languages=['en', 'es'])
    
    return style+f'Streaming started with: {hashtag}'


# stop the streaming
@app.route('/stop')
def stopStream():
    stream.topic = ''
    stream.running = False
    stream.disconnect()

    return style+'Streaming stopped'


from libs.Hashtag import Comparision
# it will manage the current status
@app.route('/status')
@cross_origin()
def currentStatus():
    stream.filter(track=['#HouseOfTheDragon', '#RingsOfPower'], threaded=True, languages=['en', 'es'])
    session = requests.get(f'https://twitter-streaming-365514-default-rtdb.firebaseio.com/comparision.json').json()

    return session[list(session.keys())[0]] if session else Comparision().__dict__
    


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
