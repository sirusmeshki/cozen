from cs50 import SQL

db = SQL("sqlite:///backend/cozen.db")


def safequery(query,*params):
    try:
        res=db.execute(query,params)
        return res
    except Exception: 
        return({"ERROR"}),500