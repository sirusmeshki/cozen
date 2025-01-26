'use client';

import { useState } from 'react';

import PhoneInput from './_components/phone-input';
import OTPInput from './_components/otp-input';
import { ReCaptchaProvider } from 'next-recaptcha-v3';

const LoginPage = () => {
  const [isPhone, setIsPhone] = useState<string>('');

  return (
    <>
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        {!isPhone ? (
          <PhoneInput setIsPhone={setIsPhone} />
        ) : (
          <OTPInput isPhone={isPhone} setIsPhone={setIsPhone} />
        )}
      </ReCaptchaProvider>
    </>
  );
};

export default LoginPage;
