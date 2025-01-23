'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Collection = {
  id: string;
  name: string;
  sizes: string;
  collabration_with: string;
};

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Flying Dreams',
    sizes: '1,2',
    collabration_with: 'Bogy',
  },
  {
    id: '2',
    name: 'Disappearance',
    sizes: '1,2,3',
    collabration_with: '3gool',
  },
];

export const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'sizes',
    header: 'Sizes',
  },
  {
    accessorKey: 'collabration_with',
    header: 'Collabration',
  },
];
