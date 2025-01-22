
from flask import jsonify



def fieldcheck(data,*args):
    for i in args:
        if i not in data or not data[i]:
             return jsonify({"error": {"message": f"Missing or invalid field", "status_code": 400}}), 400



