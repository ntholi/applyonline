'use client';

import { documents } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Document = typeof documents.$inferInsert;


type Props = {
  onSubmit: (values: Document) => Promise<Document>;
  defaultValues?: Document;
  onSuccess?: (value: Document) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
  ) => void;
  title?: string;
};

export default function DocumentForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();
  
  return (
    <Form 
      title={title}
      action={onSubmit} 
      queryKey={['documents']}
      schema={createInsertSchema(documents)} 
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/documents/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput label='Name' {...form.getInputProps('name')} />
          <TextInput label='File' {...form.getInputProps('file')} />
          <TextInput label='Type' {...form.getInputProps('type')} />
        </>
      )}
    </Form>
  );
}