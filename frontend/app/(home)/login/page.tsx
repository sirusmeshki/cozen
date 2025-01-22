'use client';

import { useState } from 'react';

import PhoneInput from './_components/phone-input';
import OTPInput from './_components/otp-input';

const LoginPage = () => {
  const [isPhone, setIsPhone] = useState<string>('');

  return (
    <>
      {!isPhone ? (
        <PhoneInput setIsPhone={setIsPhone} />
      ) : (
        <OTPInput isPhone={isPhone} />
      )}
    </>
  );
};

export default LoginPage;
