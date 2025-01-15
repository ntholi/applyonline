'use client';

import { programs } from '@/db/schema';
import { Form } from '@/components/adease';
import { Select, Textarea, TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { faculties } from './faculties';

type Program = typeof programs.$inferInsert;

type Props = {
  onSubmit: (values: Program) => Promise<Program>;
  defaultValues?: Program;
  onSuccess?: (value: Program) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
  ) => void;
  title?: string;
};

export default function ProgramForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();

  return (
    <Form
      title={title}
      action={onSubmit}
      queryKey={['programs']}
      schema={createInsertSchema(programs)}
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/programs/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput label='Name' {...form.getInputProps('name')} />
          <Select
            label='Faculty'
            {...form.getInputProps('faculty')}
            data={faculties.map((f) => ({ value: f.code, label: f.name }))}
          />
          <Textarea
            label='Description'
            {...form.getInputProps('description')}
          />
        </>
      )}
    </Form>
  );
}
