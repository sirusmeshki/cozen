'use client';

import { z } from 'zod';

export const addUserSchema = z.object({
  name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
});

export const deleteUserSchema = z.object({
  phone_number: z.string(),
});
