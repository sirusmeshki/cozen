'use client';

import { z } from 'zod';

export type Collection = {
  id: string;
  name: string;
  sizes: string;
  collabration_with: string;
};

export const addCollectionSchema = z.object({
  id: z.string().min(1, 'Name is required'),
  name: z.string().min(1, 'Name is required'),
  sizes: z.string().min(1, 'Size is required'),
  collabration_with: z.string().optional(),
});

export const deleteCollectionSchema = z.object({
  id: z.string().min(1, 'Name is required'),
  name: z.string().min(1, 'Name is required'),
});
