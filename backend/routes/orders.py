from flask import Blueprint, request, jsonify
from db import db
from .utils import fieldcheck
import logging
from flask_jwt_extended import  jwt_required ,get_jwt_identity ,get_jwt
from sqlite3 import IntegrityError



orders_routes = Blueprint('orders', __name__)



@orders_routes.route("/api/orders", methods=["POST"])
@jwt_required()
def add_order():
    identity=get_jwt_identity()
    claims = get_jwt()

 

    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403
    
    data = request.get_json()
    
    if not data:
        return jsonify({"message": "Invalid request, missing fields"}), 400
    
    field_error=fieldcheck(data,"owner_number", "tshirt_number", "tshirt_size")
    if field_error:
        return field_error

    owner_number = data["owner_number"]
    tshirt_number = data["tshirt_number"]  
    tshirt_name=data["tshirt_name"]            #jasem chejoori mikhad etelaato bezane ??????????  # faghat shomare user ba etelaate tshirt ? 
    tshirt_size = data["tshirt_size"] 

    try:
        
        owner=db.execute("SELECT * FROM users WHERE phone_number = ?", owner_number)
        owner_id=owner[0]["id"]

        if not owner:
            return jsonify({"message": "Invalid owner_id "}), 400
        
        tshirt_id = db.execute("select id from tshirts where name = ? ",tshirt_name)
        if not tshirt_id:
            return jsonify({"message":"tshirt doesnt exists"}),404
        tshirt_id=tshirt_id[0]["id"]
        order_exists=db.execute("select * from orders where tshirt_id = ? and tshirt_number = ?",tshirt_id,tshirt_number)
        if order_exists:
            return jsonify({"message":"order already exists"})
        db.execute("INSERT INTO orders (owner_id,tshirt_number,tshirt_id,tshirt_size) VALUES (?, ?, ?, ?)", owner_id, tshirt_number, tshirt_id, tshirt_size)
        return jsonify({"message": "Order placed successfully"}), 200
    
    except Exception as e:
        logging.error(e)
        return jsonify({"message": "An unexpected error occurred while placing the order"}),500
        
    
    


@orders_routes.route("/api/orders", methods=["GET"])
@jwt_required()
def get_order():
    identity = get_jwt_identity()  
    claims = get_jwt()

 

    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403


    try : 
        data = db.execute("""
        SELECT 
            u.name AS user_name,
            u.last_name AS user_last_name,
            u.phone_number AS user_number,
            o.order_date,
            o.Tshirt_number,
            t.name AS tshirt_name,
            o.Tshirt_size
        FROM orders o
        JOIN users u ON o.owner_id = u.id
        JOIN Tshirts t ON o.tshirt_id = t.id
        """)
        return jsonify(data), 200
    except Exception as e :
        logging.error(f"error loading orders : {e}")




@orders_routes.route("/api/orders", methods=["DELETE"])
@jwt_required()
def delete_order():
    identity=get_jwt_identity()
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403
    
    data = request.get_json()
    
    if not data:
        return jsonify({"message": "Invalid request, missing fields"}), 400
    
    field_error=fieldcheck(data,"tshirt_number","tshirt_name")
    if field_error:
        return field_error

    tshirt_number = data["tshirt_number"]             #jasem chejoori mikhad etelaato bezane ??????????  # faghat shomare user ba etelaate tshirt ? 
    tshirt_name = data["tshirt_name"] 

    try:
        tshirt_id=db.execute("select id from tshirts where name = ?",tshirt_name)
        if not tshirt_id:
            return jsonify({"message":"tshirt doesnt exists"})
        tshirt_id=tshirt_id[0]["id"]
        exists=db.execute("select * from orders where tshirt_number = ? and tshirt_id = ?",tshirt_number,tshirt_id)

        if exists:
            db.execute("delete from orders where tshirt_number = ? and tshirt_id = ? ",tshirt_number,tshirt_id)
            return jsonify({"message": "Order deleted successfully"})
        return jsonify({"message":"order doesnt exists"})
    except Exception as e :

        logging.error(e)
        return jsonify({"message":"An error occurred while deleting the order"})
