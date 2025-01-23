'use client';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

import { deleteUserSchema } from './utils';

import { Trash2 } from 'lucide-react';

const DeleteUser = () => {
  const form = useForm<z.infer<typeof deleteUserSchema>>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      phone_number: '',
    },
  });

  function onSubmit(values: z.infer<typeof deleteUserSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          <Trash2 />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Collection</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="0912 --- ----" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant={'destructive'}>
                Delete
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
