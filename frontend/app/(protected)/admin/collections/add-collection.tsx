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

import { addCollectionSchema } from './utils';

const AddCollection = () => {
  const form = useForm<z.infer<typeof addCollectionSchema>>({
    resolver: zodResolver(addCollectionSchema),
    defaultValues: {
      id: '',
      name: '',
      max_number: '',
      sizes: '',
      collabration_with: '',
      image: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof addCollectionSchema>) {
    const formData = new FormData();

    // Add text fields
    formData.append('id', values.id || '');
    formData.append('name', values.name || '');
    formData.append('sizes', values.sizes || '');
    formData.append('collabration_with', values.collabration_with || '');

    // Add the file (ensure the file exists in the form state)
    if (values.image) {
      formData.append('image', values.image);
    } else {
      console.error('No file selected');
      return;
    }

    console.log(formData);

    // Log FormData for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
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
          <DialogTitle>Add Collection</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Id</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
                    <FormControl>
                      <Input placeholder="1,2,3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="max_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Number</FormLabel>
                    <FormControl>
                      <Input placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collabration_with"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collabration</FormLabel>
                    <FormControl>
                      <Input placeholder="3Gool" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Picture"
                        type="file"
                        accept="image/*, application/pdf"
                        onChange={(event) => {
                          if (event.target.files && event.target.files[0]) {
                            field.onChange(event.target.files[0]);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCollection;
