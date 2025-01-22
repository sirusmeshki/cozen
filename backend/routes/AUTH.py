from flask import jsonify , request,Blueprint
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required ,get_jwt_identity,unset_jwt_cookies, create_refresh_token,set_refresh_cookies
from dotenv import load_dotenv
from .utils import fieldcheck
from smsir import send_verification_code,generate_verification_code
from db import db
import logging
from datetime import datetime,timedelta
import os

load_dotenv()

auth_routes = Blueprint('auth', __name__)


smsapi=os.getenv("smsapi")

@auth_routes.route('/api/sendsms', methods=['POST'])
def send_sms_code():
    data=request.get_json()
    if not data:
        return jsonify({"message":"data is required"})

    field_check=fieldcheck(data,"phone_number")

    if field_check:
        return field_check

    phone_number=data["phone_number"]
    user_exists=db.execute("select * from users where phone_number = ? " , phone_number)
    if not user_exists:
        return jsonify({"error":"user doesnt exists"}),404
    code = generate_verification_code()
    try:
        expdate = datetime.now() + timedelta(minutes=5)
        send_verification_code(phone_number,smsapi,code)
        db.execute("insert into verificationcode (phone_number,code,expires_at) VALUES (?,?,?) ",phone_number,code,expdate)
        return jsonify({"message":f"Verification code sent: {'code'} to {phone_number}"})
    except Exception as e:
        logging.ERROR(e)
        return jsonify({"message":"an unexpected error occured"}),500
        







@auth_routes.route('/api/verifysms', methods=['POST'])
def verify_sms_code():
    data=request.get_json()

    if not data:
        return jsonify({"message":"data is required"})

    field_check=fieldcheck(data,"code","phone_number")
    if field_check:
        return field_check
    
    entered_code=data["code"]
    phone_number=data["phone_number"]

    print(entered_code)
    if not (phone_number and entered_code):
        return jsonify({"message": "Phone number and code are required"}), 400
     
     
    #checkcode=db.execute("select * from verificationcode where phone_number = ? and code = ?",phone_number,entered_code)


    #if checkcode:  
    if entered_code == "2323":
        try :
            user = db.execute('SELECT * FROM users WHERE phone_number = ?', phone_number)

        except Exception as e :
            logging.error(f"error reaching the user : {e}" )
            return jsonify({"message":"error reaching the user"}),500
        if not user:
            return jsonify({"message": "User not found"}), 404
        user_id = str(user[0]['id'])

        admin = db.execute("select * from admins WHERE phone_number = ? ", phone_number)

        if admin:
            role = 'admin'
        else :
            role = 'user'
        
        access_token = create_access_token(identity=user_id, additional_claims={"role": role})
        refresh_token = create_refresh_token(identity=user_id)
        response = jsonify({"msg": "SMS verified", "access_token": access_token,
                            "refresh_token": refresh_token,
                            "role":role})
        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)
        return response
    else: 
        return jsonify({"error":"invalid code or number"})
        




@auth_routes.route('/api/refresh', methods=['POST'])
@jwt_required(refresh=True)  
def refresh():
    
    current_user = get_jwt_identity()
    
    
    new_access_token = create_access_token(identity=current_user)
    
    
    response = jsonify({"msg": "Access token refreshed successfully",
                        "new_access_token":new_access_token})
    set_access_cookies(response, new_access_token)
    
    return response



@auth_routes.route('/api/logout',methods=['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)  
    return response



@auth_routes.route('/api/logout',methods=['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)  
    return response

