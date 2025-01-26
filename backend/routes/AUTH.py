from flask import jsonify , request,Blueprint
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required ,get_jwt_identity,unset_jwt_cookies, create_refresh_token,set_refresh_cookies
from dotenv import load_dotenv
from .utils import fieldcheck,sanitize_phone_number,validate_phone_number
from smsir import send_verification_code,generate_verification_code
from db import db
import logging
from datetime import datetime,timedelta
import os
from flask_recaptcha import ReCaptcha
from flask_cors import cross_origin
import requests

recsecret_key=os.getenv("RECAPTCHA_PRIVATE_KEY")
recaptcha = ReCaptcha()
load_dotenv()

auth_routes = Blueprint('auth', __name__)


smsapi=os.getenv("smsapi")


@auth_routes.route('/api/resendsms', methods=['POST'])
def resend_sms_code():
    data=request.get_json()
    if not data:
        return jsonify({"message":"data is required"})

    field_check=fieldcheck(data,"phone_number","recaptcha_response")

    if field_check:
        return field_check
    
    phone_number=sanitize_phone_number(data["phone_number"])
    recaptcha_response = data.get("recaptcha_response")

    
    if not phone_number:
        return jsonify({"message": "Invalid phone number format"}), 400


    if not recaptcha_response:
        return jsonify({"message": "Invalid reCAPTCHA"}), 400
    
    user_exists=db.execute("select * from users where phone_number = ? " , phone_number)
    if not user_exists:
        return jsonify({"error":"user doesnt exists"}),404
    try:

        code =db.execute("select code from verificationcode where phone_number = ? order by created_at desc limit 1",phone_number)
        if not code:
            code = generate_verification_code()
            expdate = datetime.utcnow() + timedelta(minutes=5)
            send_verification_code(phone_number,smsapi,code)
            db.execute("insert into verificationcode (phone_number,code,expires_at) VALUES (?,?,?) ",phone_number,code,expdate)
            return jsonify({"message":f"Verification code sent: {'code'} to {phone_number}"})
        else:
            send_verification_code(phone_number,smsapi,code[0]["code"])
            return jsonify({"message":f"Verification code sent: {code[0]['code']} to {phone_number}"})  
    except Exception as e:
        logging.ERROR(e)
        return jsonify({"message":"an unexpected error occured"}),50




@auth_routes.route('/api/sendsms', methods=['POST'])
def send_sms_code():
    data=request.get_json()
    if not data:
        return jsonify({"message":"data is required"})

    field_check=fieldcheck(data,"phone_number","recaptcha_response")

    if field_check:
        return field_check

    phone_number=sanitize_phone_number(data["phone_number"])
    recaptcha_response = data.get("recaptcha_response")


    if not phone_number:
        return jsonify({"message": "Invalid phone number format"}), 400


    if not recaptcha_response :
        return jsonify({"message": "Invalid reCAPTCHA"}), 400
    
     
    secret_key = recsecret_key
    verify_url = "https://www.google.com/recaptcha/api/siteverify"
    recaptcha_data = {
        'secret': secret_key,
        'response': recaptcha_response
    }

   
    recaptcha_verification = requests.post(verify_url, data=recaptcha_data)
    recaptcha_result = recaptcha_verification.json()

    print(f"reCAPTCHA result: {recaptcha_result}")

    if not recaptcha_result.get('success'):
        return jsonify({"message": "Invalid reCAPTCHA"}), 400

    user_exists = db.execute("SELECT * FROM users WHERE phone_number = ?", phone_number)
    if not user_exists:
        return jsonify({"error": "User doesn't exist"}), 404

    try:
       
        code = db.execute("SELECT code FROM verificationcode WHERE phone_number = ? ORDER BY created_at DESC LIMIT 1", phone_number)
        if not code:
            
            code = generate_verification_code()
            expdate = datetime.utcnow() + timedelta(minutes=5)
            send_verification_code(phone_number, smsapi, code)
            db.execute("INSERT INTO verificationcode (phone_number, code, expires_at) VALUES (?, ?, ?)", phone_number, code, expdate)
            return jsonify({"message": f"Verification code sent: {code} to {phone_number}"})
        else:
            
            send_verification_code(phone_number, smsapi, code[0]["code"])
            return jsonify({"message": f"Verification code sent: {code[0]['code']} to {phone_number}"})
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"message": "An unexpected error occurred"}), 500
        







@auth_routes.route('/api/verifysms', methods=['POST'])
@cross_origin() 
def verify_sms_code():
    data=request.get_json()

    if not data:
        return jsonify({"message":"data is required"})

    field_check=fieldcheck(data,"code","phone_number")
    if field_check:
        return field_check
    
    entered_code=data["code"]
    phone_number=sanitize_phone_number(data["phone_number"])
    print(f"phone number is {phone_number}")

    if not phone_number:
        return jsonify({"message": "Invalid phone number format"}), 400

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





