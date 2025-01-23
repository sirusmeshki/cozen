'use client';

import { z } from 'zod';

export type Order = {
  id: string;
  user_name: string;
  user_last_name: string;
  user_number: string;
  tshirt_number: string;
  tshirt_size: string;
  tshirt_name: string;
  order_date: string;
};

export const addOrderSchema = z.object({
  owner_number: z.string().min(1, 'Owner phone number is required'),
  tshirt_number: z.string().min(1, 'T-shirt number is required '),
  tshirt_size: z.string().min(1, 'T-shirt size is required'),
  tshirt_name: z.string().min(1, 'T-shirt name is required'),
});
