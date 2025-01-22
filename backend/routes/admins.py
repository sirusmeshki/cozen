from flask import jsonify , request,Blueprint
from flask_jwt_extended import  jwt_required ,get_jwt_identity ,get_jwt

from .utils import fieldcheck
from db import db
import logging



admin_routes = Blueprint('admin', __name__)


@admin_routes.route("/api/admin",methods=["POST"])
@jwt_required()
def add_admin():
    identity = get_jwt_identity() 
    claims = get_jwt() 
   
    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403
    
    data=request.get_json()

    field_error=fieldcheck(data,"phone_number")
    if field_error:
        return field_error
    
    phone_number=data["phone_number"]
    
    try:
        new_admin_id=db.execute("select id from users where phone_number = ? ",phone_number)
        if not new_admin_id:
            return jsonify({"message":"user not found"}),404
        new_admin_id=new_admin_id[0]["id"]
        new_admin_already_admin=db.execute("select * from admins where phone_number = ? ",phone_number)
        if new_admin_already_admin:
            return jsonify({"message":"user is already admin"})
        db.execute("insert into admins (user_id,phone_number) VALUES (?,?)",new_admin_id,phone_number)
        return jsonify({"message": "Admin added successfully"}), 201
    except Exception as e:
        logging.error(f"error:{e}")
        return jsonify({"message":"error occured"})



@admin_routes.route("/api/admin",methods=["GET"])
@jwt_required()
def get_admins():
    identity = get_jwt_identity() 
    claims = get_jwt() 
    
    

    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403
    
    try:
        data = db.execute("""
    SELECT users.name, users.last_name, users.phone_number
    FROM admins
    JOIN users ON admins.user_id = users.id
""")
        return jsonify({"data":data})
    except Exception as e:
        logging.error(f"error while selecting admins: {e}")
    


@admin_routes.route("/api/admin", methods=["DELETE"])
@jwt_required()
def remove_admin():
    identity = get_jwt_identity()  
    claims = get_jwt()

    
    if claims.get("role") != "admin":
        return jsonify({"message": "Access forbidden, admin role required"}), 403

    data = request.get_json()

    fieldcheck(data,"phone_number")

    phone_number = data["phone_number"]
    
    try:
       
        user_id=db.execute('select id from users where phone_number = ?',phone_number)
        if not user_id:
            return jsonify({"message":"user doesnt exists"})
        user_id=user_id[0]["id"]
        admin = db.execute("SELECT * FROM admins WHERE user_id = ?", user_id)
        if not admin:
            return jsonify({"message": "User is not an admin"}), 404

        admin=admin[0]["id"]
        db.execute("DELETE FROM admins WHERE user_id = ?", user_id)
        return jsonify({"message": "Admin successfully removed"}), 200

    except Exception as e:
        logging.error(f"Error removing admin: {e}")
        return jsonify({"message": "An error occurred while removing the admin"}), 500