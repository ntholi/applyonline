'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { documentTypes } from '@/db/schema';
import { uploadDocument } from '@/lib/storage';
import { createDocument } from '@/server/documents/actions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { FormNavigation } from '../core/form-navigation';
import DocumentPicker from './DocumentPicker';
import { Button } from '@/components/ui/button';
import { Loader2, FileIcon, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Props = {
  studentId: number;
};

const schema = z.object({
  type: z.enum(documentTypes),
  file: z
    .instanceof(File)
    .refine((f) => f.size < 5 * 1024 * 1024, 'File must be less than 5MB'),
});

export type Document = z.infer<typeof schema>;

export default function DocumentForm({ studentId }: Props) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: upload, isPending } = useMutation({
    mutationFn: async () => {
      const promises = documents.map(async (doc) => {
        if (!doc.file) return;
        const url = await uploadDocument(doc.file);
        await createDocument({
          studentId,
          fileName: doc.file.name,
          url,
          type: doc.type,
        });
      });
      await Promise.all(promises);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Documents uploaded successfully',
      });
      router.push('/');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to upload documents. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const removeDocument = (type: string) => {
    setDocuments(documents.filter((doc) => doc.type !== type));
  };

  const isDocumentTypeUsed = (type: string) => {
    return documents.some((doc) => doc.type === type);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Required Documents</h2>
        <DocumentPicker
          setValue={(doc) => {
            if (isDocumentTypeUsed(doc.type)) {
              toast({
                title: 'Document type already added',
                description: 'Please remove the existing document first.',
                variant: 'destructive',
              });
              return;
            }
            setDocuments([...documents, doc]);
          }}
        />
      </div>

      <Separator />

      {documents.length === 0 ? (
        <Card>
          <CardContent className='text-muted-foreground flex flex-col items-center justify-center py-8'>
            <FileIcon className='mb-2 h-12 w-12' />
            <p>No documents added yet</p>
            <p className='text-sm'>
              Click the Add Document button to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='grid gap-4 md:grid-cols-2'>
          {documents.map((doc) => (
            <Card key={doc.type}>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-1'>
                    <p className='font-medium'>{doc.type}</p>
                    <p className='text-muted-foreground max-w-[200px] truncate text-sm'>
                      {doc.file.name}
                    </p>
                    <p className='text-muted-foreground text-xs'>
                      {(doc.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => removeDocument(doc.type)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <FormNavigation
        backUrl='/apply/review'
        loading={isPending}
        onSave={() => {
          if (documents.length === 0) {
            toast({
              title: 'No documents',
              description:
                'Please add at least one document before proceeding.',
              variant: 'destructive',
            });
            return;
          }
          upload();
        }}
      />
    </div>
  );
}
