from db import db
import time



def cleanup_expired_codes():
    while True:
        print("Cleaning up expired verification codes...")
        res=db.execute("DELETE FROM VerificationCodes WHERE expires_at < CURRENT_TIMESTAMP")
        print(f'{res} expired verification codes deleted')
        if res:
            print(f"Deleted expired verification codes")

        else:
            print("No expired verification codes found")
        
        time.sleep(3600) 