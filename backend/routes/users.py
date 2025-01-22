from flask import Blueprint, request, jsonify
from db import db
from .utils import fieldcheck
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging
from flask_jwt_extended import  jwt_required ,get_jwt_identity, get_jwt
from config import Config






users_routes = Blueprint('users', __name__)




@users_routes.route("/api/users", methods=["POST"])
@jwt_required()
def add_user():
    identity = get_jwt_identity()  
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403
    
    data = request.get_json()

    if not data:
        return jsonify({"message": "Invalid request, missing fields"}), 400

    field_check=fieldcheck(data,"name","last_name","phone_number")
    if field_check:
        return field_check
    
    name = data["name"]
    last_name = data["last_name"]
    number = data["phone_number"]

    try:
        existing_user=db.execute('select * from users where phone_number = ? ',number)
        if existing_user:
            return jsonify({"message":"phone number already exists"})
        db.execute("INSERT INTO users (name, last_name, phone_number) VALUES (?, ?, ?)", name, last_name, number)
    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return jsonify({"message": "An error occurred while adding the user"}), 500
    
    return jsonify({"message": "User added successfully"}), 200




@users_routes.route("/api/users", methods=["GET"])
@jwt_required()
def get_user_tshirts():
    id = get_jwt_identity()

    if not id :
        return jsonify({"message": "Access denied"}), 403  
    
    cached_data = Config.cache.get(f"user_tshirts_{id}")
    print(f"cached fata = {cached_data}")
    if cached_data:
        return jsonify(cached_data)

    try:
        
        user_data = db.execute("""
        SELECT name, last_name, phone_number
        FROM users
        WHERE id = ?
        """, id)
        tshirt_data = db.execute("""
        SELECT 
            t.name AS tshirt_name,
            o.tshirt_number AS Tshirt_number,
            o.Tshirt_size,
            o.order_date
        FROM orders o
        JOIN Tshirts t ON o.tshirt_id = t.id
        WHERE o.owner_id = ?
        """, id)

    except Exception as e:
        logging.error(f"error:{e}")
        return jsonify({"message": "An error occurred"}), 500

    user = user_data[0]  
    user_profile = {
        "first_name": user['name'],
        "last_name": user['last_name'],
        "phone_number": user['phone_number']
    }

    
    data_to_cache = {
        "user_profile": user_profile,
        "orders": tshirt_data
    }
    
    Config.cache.set(f"user_tshirts_{id}", data_to_cache, timeout=600) 
    print("data cached")

    return jsonify(data_to_cache)


@users_routes.route("/api/users", methods=["DELETE"])
@jwt_required()
def delete_user():
    identity = get_jwt_identity()  
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403
    
    data = request.get_json()

    if not data:
        return jsonify({"message": "Invalid request, missing fields"}), 400

    field_check=fieldcheck(data,"phone_number")
    if field_check:
        return field_check
    
    
    number = data["phone_number"]

    try:
        existing_user=db.execute('select * from users where phone_number = ? ',number)
        if not existing_user:
            return jsonify({"message":"user doesnt exists"})
        db.execute("delete from users where phone_number = ? ", number)
    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return jsonify({"message": "An error occurred while deleting the user"}), 500
    
    return jsonify({"message": "User deleted successfully"}), 200
