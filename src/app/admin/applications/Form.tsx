'use client';

import { applications } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput, DateInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Application = typeof applications.$inferInsert;


type Props = {
  onSubmit: (values: Application) => Promise<Application>;
  defaultValues?: Application;
  onSuccess?: (value: Application) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
  ) => void;
  title?: string;
};

export default function ApplicationForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();
  
  return (
    <Form 
      title={title}
      action={onSubmit} 
      queryKey={['applications']}
      schema={createInsertSchema(applications)} 
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/applications/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput label='User' {...form.getInputProps('user')} />
          <TextInput label='Status' {...form.getInputProps('status')} />
          <DateInput label='Submission Date' {...form.getInputProps('submissionDate')} />
          <DateInput label='Review Date' {...form.getInputProps('reviewDate')} />
        </>
      )}
    </Form>
  );
}