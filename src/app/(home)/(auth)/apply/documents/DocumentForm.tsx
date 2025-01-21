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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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
import { FileUp, Plus, Trash2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
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
        ),
      {
        message: 'Please upload at least one academic document',
      },
    )
    .refine(
      (docs) =>
        docs.some(
          (doc) => (doc.type === 'ID' || doc.type === 'Passport') && doc.file,
        ),
      {
        message: 'Please upload at least one identity document',
      },
    ),
});

type FormSchema = z.infer<typeof formSchema>;

function DocumentDialog({
  onSubmit,
}: {
  onSubmit: (type: string, file: File) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<string>('ID');
  const fileRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (file) {
      onSubmit(selectedType, file);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='w-full gap-2 text-muted-foreground hover:text-foreground'
        >
          <Plus className='h-4 w-4' />
          Add Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload your academic certificates, transcripts, or identity
              documents
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <FormLabel>Document Type</FormLabel>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ID'>ID Document</SelectItem>
                  <SelectItem value='Passport'>Passport</SelectItem>
                  <SelectItem value='Certificate'>Certificate</SelectItem>
                  <SelectItem value='Statement of Results'>
                    Statement of Results
                  </SelectItem>
                  <SelectItem value='Other'>Other Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <FormLabel>Upload Document</FormLabel>
              <div className='relative'>
                <Input
                  ref={fileRef}
                  type='file'
                  accept='application/pdf,image/*'
                  required
                  className='cursor-pointer pl-10'
                />
                <FileUp className='absolute left-3 top-2.5 h-5 w-5 text-muted-foreground' />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' className='gap-2'>
              <Upload className='h-4 w-4' />
              Upload Document
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DocumentCard({
  type,
  file,
  onRemove,
}: {
  type: string;
  file: File;
  onRemove: () => void;
}) {
  const isIdentity = type === 'ID' || type === 'Passport';
  const label = {
    ID: 'ID Document',
    Passport: 'Passport',
    Certificate: 'Certificate',
    'Statement of Results': 'Statement of Results',
    Other: 'Other Document',
  }[type];

  return (
    <div className='group relative flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-accent/5'>
      <div className='flex-1 space-y-1'>
        <div className='flex items-center gap-2'>
          <p className='font-medium'>{label}</p>
          <span className='rounded-full bg-secondary px-2 py-0.5 text-xs font-medium'>
            {isIdentity ? 'Identity' : 'Academic'}
          </span>
        </div>
        <p className='text-sm text-muted-foreground'>{file.name}</p>
      </div>

      <Progress value={100} className='h-1 w-[100px]' />

      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100'
        onClick={onRemove}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
  );
}

export default function DocumentForm({ studentId }: DocumentFormProps) {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormSchema) => {
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

  function onSubmit(values: FormSchema) {
    mutate(values);
  }

  const documents = form.watch('documents');

  function addDocument(type: string, file: File) {
    form.setValue('documents', [...documents, { type: type as any, file }]);
  }

  function removeDocument(index: number) {
    const newDocs = [...documents];
    newDocs.splice(index, 1);
    form.setValue('documents', newDocs);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>
              Please upload your required documents. You must provide at least
              one identity document (ID or Passport) and one academic document
              (Certificate or Statement of Results).
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              {documents.map((doc, index) => {
                if (!doc.file) return null;
                return (
                  <DocumentCard
                    key={index}
                    type={doc.type}
                    file={doc.file}
                    onRemove={() => removeDocument(index)}
                  />
                );
              })}
            </div>

            <DocumentDialog onSubmit={addDocument} />

            {form.formState.errors.documents?.message && (
              <p className='text-sm font-medium text-destructive'>
                {form.formState.errors.documents.message}
              </p>
            )}
          </CardContent>
        </Card>

        <FormNavigation loading={isPending} />
      </form>
    </Form>
  );
}
