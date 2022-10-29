from flask import Flask
from flask_cors import CORS, cross_origin


#----------- App configuration -----------#
app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


#-------------- App routes --------------#
@app.route('/')
def index():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
