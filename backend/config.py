from flask_caching import Cache

import os 
class Config:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'photos')
    print(f'upload folder is {UPLOAD_FOLDER}')
    CACHE_TYPE = 'simple'  
    CACHE_DEFAULT_TIMEOUT = 600  
    cache = Cache()




