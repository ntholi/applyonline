'use client';

import { subjects } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Subject = typeof subjects.$inferInsert;


type Props = {
  onSubmit: (values: Subject) => Promise<Subject>;
  defaultValues?: Subject;
  onSuccess?: (value: Subject) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
  ) => void;
  title?: string;
};

export default function SubjectForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();
  
  return (
    <Form 
      title={title}
      action={onSubmit} 
      queryKey={['subjects']}
      schema={createInsertSchema(subjects)} 
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/subjects/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput label='Name' {...form.getInputProps('name')} />
        </>
      )}
    </Form>
  );
}