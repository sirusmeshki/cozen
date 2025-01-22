'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TypographyP } from '@/components/typography/typography-p';
import { TypographyLarge } from '@/components/typography/typography-large';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

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
      setIsPhone(values.phone);
    }
  }

  return (
    <>
      {/* Title */}
      <TypographyLarge>
        <div>Hi</div>
        <div>Welcome to</div>
        <div>Cozen</div>
      </TypographyLarge>

      {/* Input */}
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

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="09" {...field} />
                  </FormControl>
                  <FormMessage />
                  <TypographyP>
                    We will send you an one time password.
                  </TypographyP>
                </FormItem>
              )}></FormField>
          </div>

          <div className="sticky bottom-9 mt-auto w-full">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PhoneInput;
