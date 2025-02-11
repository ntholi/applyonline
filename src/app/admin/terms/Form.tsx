'use client';

import { terms } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput, Checkbox } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Term = typeof terms.$inferInsert;


type Props = {
  onSubmit: (values: Term) => Promise<Term>;
  defaultValues?: Term;
  onSuccess?: (value: Term) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
  ) => void;
  title?: string;
};

export default function TermForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();
  
  return (
    <Form 
      title={title}
      action={onSubmit} 
      queryKey={['terms']}
      schema={createInsertSchema(terms)} 
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/terms/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput label='Name' {...form.getInputProps('name')} />
          <Checkbox label='Is Active' {...form.getInputProps('isActive')} />
        </>
      )}
    </Form>
  );
}