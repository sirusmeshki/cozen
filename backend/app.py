from flask import Flask
from routes import orders_routes, users_routes, tshirts_routes, auth_routes, admin_routes
from models import create_tables
from flask_jwt_extended import JWTManager
from datetime import timedelta
import logging
from dotenv import load_dotenv
import os
from config import Config
from flask_recaptcha import ReCaptcha
from threading import Thread
from celery_conf import cleanup_expired_codes
from flask_cors import CORS

UPLOAD_FOLDER = Config.UPLOAD_FOLDER
STATIC_URL_PATH = '/static/photos'


load_dotenv()
app_secret_key = os.getenv("APP_SECRET_KEY")
jwt_secret_key = os.getenv("JWT_SECRET_KEY")

app = Flask(__name__)
app.config.from_object(Config)

Config.cache.init_app(app)

app.config['RECAPTCHA_PUBLIC_KEY'] = os.getenv("RECAPTCHA_PUBLIC_KEY")
app.config['RECAPTCHA_PRIVATE_KEY'] = os.getenv("RECAPTCHA_PRIVATE_KEY")
recaptcha = ReCaptcha(app)


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CACHE_KEY_PREFIX'] = 'myapp_'
app.config['SECRET_KEY'] = app_secret_key
app.config['JWT_SECRET_KEY'] = jwt_secret_key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=15)

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s', filename='app.log', filemode="w")
jwt = JWTManager(app)
CORS(app)

create_tables()


app.register_blueprint(admin_routes)
app.register_blueprint(auth_routes)
app.register_blueprint(orders_routes)
app.register_blueprint(users_routes)
app.register_blueprint(tshirts_routes)



def start_scheduler():
    thread = Thread(target=cleanup_expired_codes)
    thread.daemon = True 
    thread.start()






if __name__ == "__main__":
    start_scheduler()
    app.run(debug=True)
