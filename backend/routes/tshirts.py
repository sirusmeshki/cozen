from flask import Blueprint, request, jsonify
from db import db
from .utils import fieldcheck
import logging
from flask_jwt_extended import  jwt_required ,get_jwt_identity,get_jwt


tshirts_routes = Blueprint('tshirts', __name__)



@tshirts_routes.route("/api/tshirts", methods=["POST"])
@jwt_required()
def add_shirt():

    identity = get_jwt_identity()  
    claims=get_jwt()
     

    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403
    
    data = request.get_json()

    if not data:
        return jsonify({"message":"invalid request"})

    field_check=fieldcheck(data,"name","sizes","collabration_with","tshirt_id") #tshirt id = shomareye har tshirt, flying dreams 1 3gool=2  
    if field_check:
        return field_check

    tshirt_id=data["tshirt_id"]
    name = data["name"]
    sizes = data["sizes"]
    collabration_with = data["collabration_with"]

    try:
        tshirt_exists=db.execute("select * from tshirts where name = ? " , name)
        if tshirt_exists:
            return jsonify({"message":"tshirt already exists"})
        db.execute("INSERT INTO Tshirts (name, sizes, collabration_with) VALUES (?, ?, ?)", name, sizes, collabration_with)
    except Exception as e:
        logging.error(f"Error adding shirt: {e}")
        return jsonify({"message": "An error occurred while adding the shirt"}), 500
    
    return jsonify({"message": "Shirt added successfully"}), 200



@tshirts_routes.route("/api/tshirts", methods=["DELETE"])
@jwt_required()
def delete_tshirt():
    identity = get_jwt_identity()  
    claims=get_jwt()
     

    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403
    
    data = request.get_json()

    if not data:
        return jsonify({"message":"invalid request"})

    field_check=fieldcheck(data,"tshirt_id")
    if field_check:
        return field_check

    tshirt_id=data["tshirt_id"]

    try:

        db.execute("DELETE FROM Tshirts WHERE id = ?", (tshirt_id,))
        
    except Exception as e:
        logging.error(f"Error deleting tshirt: {e}")
        return jsonify({"error": "database error"}), 500

    return jsonify({"message": "Tshirt and related orders deleted successfully"}), 200