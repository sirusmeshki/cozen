from flask_caching import Cache

class Config:
    CACHE_TYPE = 'simple'  
    CACHE_DEFAULT_TIMEOUT = 600  
    cache = Cache()




