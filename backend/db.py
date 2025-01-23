import os
from cs50 import SQL

db_path = os.path.join(os.path.dirname(__file__), "cozen.db")

db=SQL(f"sqlite:///{db_path}")

def safequery(query,*params):
    try:
        res=db.execute(query,params)
        return res
    except Exception: 
        return({"ERROR"}),500