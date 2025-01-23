'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { TypographyP } from '@/components/typography/typography-p';
import { TypographyLarge } from '@/components/typography/typography-large';

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: 'Your one-time password must be 4 characters.',
  }),
});

const OTPInput = ({
  isPhone,
  setIsPhone,
}: {
  isPhone: string;
  setIsPhone: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // TODO: Verify OTP
    console.log(data);
  }

  return (
    <>
      {/* Title */}
      <TypographyLarge>
        <div>Verify</div>
        <div>your</div>
        <div>code</div>
      </TypographyLarge>

      {/* OTP */}
      <Form {...form}>
        <form
          className="relative flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-12">
            {/* SubTitle */}
            <div className="mb-4 -space-y-1">
              <TypographyLarge>Login</TypographyLarge>
              <div className="flex items-center justify-between">
                <TypographyP>
                  Code has been sent to{' '}
                  <span className="font-extrabold">{isPhone}</span>
                </TypographyP>
                <Button
                  onClick={() => setIsPhone('')}
                  size="sm"
                  type="button"
                  variant="outline">
                  Change Number
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup className="flex w-full">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <div className="flex justify-between">
                    <TypographyP>Didn’t get OTP Code ?</TypographyP>
                    <Button
                      type="button"
                      className="p-0 uppercase"
                      variant="link"
                      size={'sm'}>
                      Resend Code
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

export default OTPInput;
