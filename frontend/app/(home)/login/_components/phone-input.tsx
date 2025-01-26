'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { ReCaptcha, useReCaptcha } from 'next-recaptcha-v3';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TypographyLarge } from '@/components/typography/typography-large';
import { TypographyP } from '@/components/typography/typography-p';

import { FormSchema } from './definitions';

const PhoneInput = ({
  setIsPhone,
}: {
  setIsPhone: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useReCaptcha();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    setIsPhone(values.phone);

    const token = await executeRecaptcha('form_submit');
    const res = {
      phone_number: values.phone,
      token,
    };

    try {
      await axios.post('http://127.0.0.1:5000/api/sendsms', res, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsPhone(values.phone);
    }
  };

  return (
    <>
      {/* Title */}
      <TypographyLarge>
        <div>Hi</div>
        <div>Welcome to</div>
        <div>Cozen Club</div>
      </TypographyLarge>

      {/* Form */}
      <Form {...form}>
        <form
          className="relative flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-12">
            {/* SubTitle */}
            <div className="mb-4 -space-y-1">
              <TypographyLarge>Login</TypographyLarge>
              <TypographyP>Enter your phone number</TypographyP>
            </div>

            {/* Phone Number Input */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className="h-20 px-5 text-4xl font-extrabold"
                      placeholder="09"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <TypographyP>
                    We will send you an one time password.
                  </TypographyP>
                </FormItem>
              )}
            />
          </div>

          {/* Next Step Button: OTP */}
          <div className="sticky bottom-9 mt-auto w-full">
            <Button disabled={isLoading} size="xl" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PhoneInput;
