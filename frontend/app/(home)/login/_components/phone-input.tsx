'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const formSchema = z.object({
  phone: z
    .string()
    .min(2, { message: 'Please enter your phone number' })
    .regex(/^09\d{9}$/, {
      message: 'Phone Number is not valid',
    }),
});

const PhoneInput = ({
  setIsPhone,
}: {
  setIsPhone: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.phone) {
      // TODO: SEND PHONE NUMBER TO BACKEND
      setIsPhone(values.phone);
    }
  }

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
            <Button size="xl" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PhoneInput;
