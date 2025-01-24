from flask_caching import Cache

import os 
class Config:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    print(f"base dir is {BASE_DIR}")
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'photos')
    print(f'upload folder is {UPLOAD_FOLDER}')
    CACHE_TYPE = 'simple'  
    CACHE_DEFAULT_TIMEOUT = 600  
    cache = Cache()
    CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0')
    CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')





