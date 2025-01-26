import { z } from 'zod';

export const FormSchema = z.object({
  phone: z
    .string()
    .min(2, { message: 'Please enter your phone number' })
    .regex(/^09\d{9}$/, {
      message: 'Phone Number is not valid',
    }),
});

export type FormState =
  | {
      errors?: {
        phone?: string[];
      };
      message?: string;
    }
  | undefined;
