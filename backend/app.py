from flask import Flask
from routes import orders_routes, users_routes, tshirts_routes, auth_routes, admin_routes
from models import create_tables
from flask_jwt_extended import JWTManager
from datetime import timedelta
import logging
from dotenv import load_dotenv
import os
from config import Config
from flask import send_from_directory


UPLOAD_FOLDER =os.path.join(os.path.dirname(__file__), "uploads")
STATIC_URL_PATH = "/static/uploads/tshirts"
load_dotenv()
app_secret_key = os.getenv("APP_SECRET_KEY")
jwt_secret_key = os.getenv("JWT_SECRET_KEY")
print(f'test is = {app_secret_key,jwt_secret_key}')
print(f'test is = {app_secret_key,jwt_secret_key}')

app = Flask(__name__)
app.config.from_object(Config) 

Config.cache.init_app(app)
@app.route(f'{STATIC_URL_PATH}/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CACHE_KEY_PREFIX'] = 'myapp_'
app.config['SECRET_KEY'] = app_secret_key
app.config['JWT_SECRET_KEY'] = jwt_secret_key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)  # Access token expires in 1 hour
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=15)  # Refresh token expires in 7 days
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s' , filename='app.log' , filemode="w")
jwt = JWTManager(app)



create_tables()
app.register_blueprint(admin_routes)
app.register_blueprint(auth_routes)
app.register_blueprint(orders_routes)
app.register_blueprint(users_routes)
app.register_blueprint(tshirts_routes)

if __name__ == "__main__":
    app.run(debug=False)