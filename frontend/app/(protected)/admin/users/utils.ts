'use client';

import { z } from 'zod';

export type User = {
  id: string;
  name: string;
  last_name: string;
  phone_number: string;
};

export const addUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone_number: z
    .string()
    .min(2, { message: 'Enter phone number' })
    .regex(/^09\d{9}$/, {
      message: 'Phone number not valid!',
    }),
});

export const deleteUserSchema = z.object({
  phone_number: z
    .string()
    .min(2, { message: 'Enter phone number' })
    .regex(/^09\d{9}$/, {
      message: 'Phone number not valid!',
    }),
});
