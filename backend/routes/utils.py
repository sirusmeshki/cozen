
from flask import jsonify
from datetime import datetime
import os 
from config import Config
import stat
import re
UPLOAD_FOLDER = Config.UPLOAD_FOLDER

from datetime import datetime
import os

STATIC_URL_PATH ='/static/photos'
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




def save_uploaded_image(file_content, original_extension=".jpg"):
        now = datetime.now()
        filename = now.strftime("%Y%m%d_%H%M%S") + original_extension
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        
        # Ensure the upload folder exists
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)

        # Set permissions (optional, makes the folder writable by the app)
        os.chmod(UPLOAD_FOLDER, stat.S_IRWXU | stat.S_IRWXG | stat.S_IROTH)  # Owner, group, others read, write, execute permissions


        # Save the image file
        with open(filepath, "wb") as f:
            f.write(file_content)

        relative_path = os.path.join(STATIC_URL_PATH, filename).replace("\\", "/")

        print(f"Image rl to {relative_path}")
        return relative_path
   



def sanitize_phone_number(phone_number):
    # Remove any non-digit characters
    sanitized= re.sub(r'\D', '', phone_number)
    return sanitized if len(sanitized) == 11 else None

def validate_phone_number(phone_number):
    # Ensure the phone number is in the expected format (e.g., 10 digits)
    return re.match(r'^\d{10}$', phone_number)