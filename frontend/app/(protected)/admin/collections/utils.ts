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
  max_number: z.string(),
  collabration_with: z.string().optional(),
  image: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: 'Your resume must be less than 7MB.',
  }),
});

export const deleteCollectionSchema = z.object({
  id: z.string().min(1, 'Name is required'),
  name: z.string().min(1, 'Name is required'),
});
