'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { documentTypes } from '@/db/schema';
import { uploadDocument } from '@/lib/storage';
import { createDocument } from '@/server/documents/actions';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { FormNavigation } from '../core/form-navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import DocumentPicker from './DocumentPicker';

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
  const { mutate: upload, isPending } = useMutation({
    mutationFn: async (doc: Document) => {
      if (!doc.file) return;
      const url = await uploadDocument(doc.file);
      await createDocument({
        studentId,
        fileName: doc.file.name,
        url,
        type: doc.type,
      });
    },
  });

  return (
    <div>
      <DocumentPicker setValue={(it) => setDocuments([...documents, it])} />

      <Separator className='my-5' />
      <Card>
        <CardContent>
          {documents.map((doc) => (
            <div key={doc.type}>{doc.type}</div>
          ))}
        </CardContent>
      </Card>
      <FormNavigation
        backUrl='/apply/programs'
        loading={isPending}
        onSave={() => router.push('/')}
      />
    </div>
  );
}
