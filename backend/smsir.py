
from datetime import datetime, timedelta
import http.client
import json
import random





def generate_verification_code():

    return ''.join([str(random.randint(0, 9)) for _ in range(6)])





def send_verification_code(mobile,api_key,code):
    
    conn = http.client.HTTPSConnection("api.sms.ir")
    template_id="236579"
    payload = json.dumps({
        "mobile": mobile,
        "templateId": template_id,
        "parameters": [
            {
                "name": "code",
                "value": code
            }
        ]
    })

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'x-api-key': api_key
    }

    conn.request("POST", "/v1/send/verify", payload, headers)
    res = conn.getresponse()
    data = res.read()
    return data.decode("utf-8")




