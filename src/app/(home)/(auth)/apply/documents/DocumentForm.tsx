'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { uploadDocument } from '@/lib/storage';
import { createDocument } from '@/server/documents/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormNavigation } from '../core/form-navigation';

interface DocumentFormProps {
  studentId: number;
}

const formSchema = z.object({
  documents: z
    .array(
      z.object({
        type: z.enum([
          'Certificate',
          'Statement of Results',
          'ID',
          'Passport',
          'Other',
        ] as const),
        file: z.instanceof(File).nullable(),
      }),
    )
    .refine(
      (docs) =>
        docs.some(
          (doc) =>
            (doc.type === 'Certificate' ||
              doc.type === 'Statement of Results') &&
            doc.file,
        ) &&
        docs.some(
          (doc) => (doc.type === 'ID' || doc.type === 'Passport') && doc.file,
        ),
      {
        message:
          'Please upload both your Certificate/Results and ID/Passport documents',
      },
    ),
});

export default function DocumentForm({ studentId }: DocumentFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: [
        { type: 'Certificate', file: null },
        { type: 'ID', file: null },
      ],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      for (const doc of values.documents) {
        if (!doc.file) continue;

        const url = await uploadDocument(doc.file);
        await createDocument({
          studentId,
          name: doc.file.name,
          file: url,
          type: doc.type,
        });
      }
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Please upload your Certificate/Results and ID/Passport documents.
            You can add additional documents if needed.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {form.watch('documents').map((doc, index) => (
            <div
              key={index}
              className='flex items-start gap-4 rounded-lg border p-4'
            >
              <div className='flex-1 space-y-4'>
                <FormField
                  control={form.control}
                  name={`documents.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Certificate'>
                            Certificate
                          </SelectItem>
                          <SelectItem value='Statement of Results'>
                            Statement of Results
                          </SelectItem>
                          <SelectItem value='ID'>ID</SelectItem>
                          <SelectItem value='Passport'>Passport</SelectItem>
                          <SelectItem value='Other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`documents.${index}.file`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          accept='image/*,.pdf'
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {index > 1 && (
                <Button
                  type='button'
                  variant='destructive'
                  size='icon'
                  onClick={() => {
                    const newDocs = form.getValues('documents');
                    newDocs.splice(index, 1);
                    form.setValue('documents', newDocs);
                  }}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              )}
            </div>
          ))}

          <div className='flex justify-between'>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                const newDocs = form.getValues('documents');
                newDocs.push({ type: 'Other', file: null });
                form.setValue('documents', newDocs);
              }}
            >
              <Plus className='mr-2 h-4 w-4' />
              Add Document
            </Button>

            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Upload className='mr-2 h-4 w-4' />
              )}
              Upload Documents
            </Button>
          </div>
        </CardContent>
      </Card>
      <FormNavigation
        onSave={form.handleSubmit(onSubmit)}
        backUrl='/'
        loading={isPending}
      />
    </Form>
  );
}
