
from flask import jsonify
from datetime import datetime
import os 
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")

from datetime import datetime
import os

def create_upload_path():
    now = datetime.now()
    path = os.path.join(UPLOAD_FOLDER, str(now.year), str(now.month), str(now.day))
    os.makedirs(path, exist_ok=True)  # Ensure the path is created if it doesn't exist
    return path

def fieldcheck(data,*args):
    for i in args:
        if i not in data or not data[i]:
             return jsonify({"error": {"message": f"Missing or invalid field", "status_code": 400}}), 400


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def create_upload_path():
    now = datetime.now()
    path = os.path.join(UPLOAD_FOLDER, str(now.year), str(now.month), str(now.day))
    os.makedirs(path, exist_ok=True)  # Ensure the path is created if it doesn't exist
    return path