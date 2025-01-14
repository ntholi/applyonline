'use client';

import { qualifications } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Qualification = typeof qualifications.$inferInsert;


type Props = {
  onSubmit: (values: Qualification) => Promise<Qualification>;
  defaultValues?: Qualification;
  onSuccess?: (value: Qualification) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
  ) => void;
  title?: string;
};

export default function QualificationForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();
  
  return (
    <Form 
      title={title}
      action={onSubmit} 
      queryKey={['qualifications']}
      schema={createInsertSchema(qualifications)} 
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/qualifications/${id}`);
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