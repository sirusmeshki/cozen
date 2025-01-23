'use client';

import { z } from 'zod';

export const addOrderSchema = z.object({
  owner_number: z.string(),
  tshirt_number: z.string(),
  tshirt_size: z.string(),
  tshirt_name: z.string(),
});
