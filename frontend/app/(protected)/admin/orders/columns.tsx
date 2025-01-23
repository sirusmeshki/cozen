'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

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

export const orders: Order[] = [
  {
    id: '1',
    user_name: 'amirali',
    user_last_name: 'esmaili',
    user_number: '09199912345',
    tshirt_number: '24',
    tshirt_name: 'Flying Dreams',
    tshirt_size: '4',
    order_date: '2025-01-23',
  },
  {
    id: '2',
    user_name: 'sirus',
    user_last_name: 'meshki',
    user_number: '09355223769',
    tshirt_number: '55',
    tshirt_name: 'Disappearance',
    tshirt_size: '2',
    order_date: '2025-01-26',
  },
  {
    id: '3',
    user_name: 'sirus',
    user_last_name: 'meshki',
    user_number: '09355223769',
    tshirt_number: '60',
    tshirt_name: 'Flying Dreams',
    tshirt_size: '1',
    order_date: '2024-12-01',
  },
];

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'user_number',
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          User Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'user_name',
    header: 'First Name',
  },
  {
    accessorKey: 'user_last_name',
    header: 'Last Name',
  },
  {
    accessorKey: 'tshirt_number',
    header: 'T-Shirt Number',
  },
  {
    accessorKey: 'tshirt_name',
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          T-Shirt Name
          <ArrowUpDown className="ml-2 h-2 w-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'tshirt_size',
    header: 'T-Shirt Size',
  },
  {
    accessorKey: 'order_date',
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
