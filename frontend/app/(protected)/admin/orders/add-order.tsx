'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CirclePlus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { addOrderSchema } from './utils';

const AddOrder = () => {
  const form = useForm<z.infer<typeof addOrderSchema>>({
    resolver: zodResolver(addOrderSchema),
    defaultValues: {
      owner_number: '',
      tshirt_number: '',
      tshirt_name: '',
      tshirt_size: '',
    },
  });

  function onSubmit(values: z.infer<typeof addOrderSchema>) {
    // TODO: Add Order Route
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <CirclePlus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Order</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="owner_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Number</FormLabel>
                    <FormControl>
                      <Input placeholder="0912 --- -- --" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tshirt_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>T-Shirt Number</FormLabel>
                    <FormControl>
                      <Input placeholder="40" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tshirt_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>T-Shirt Name</FormLabel>
                    <FormControl>
                      <Input placeholder="3Gool" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tshirt_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>T-Shirt Size</FormLabel>
                    <FormControl>
                      <Input placeholder="3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrder;
