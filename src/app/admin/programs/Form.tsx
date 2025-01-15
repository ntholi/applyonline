'use client';

import { Form } from '@/components/adease';
import { programs } from '@/db/schema';
import { Select, Textarea } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { faculties } from './types/faculties';
import { getProgramByFaculty } from './types/programs';

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
          <Select
            label='Faculty'
            {...form.getInputProps('faculty')}
            data={faculties.map((f) => ({ value: f.code, label: f.name }))}
          />
          <Select
            label='Name'
            {...form.getInputProps('name')}
            data={getProgramByFaculty(form?.values?.faculty ?? '').map((p) => ({
              value: p.name,
              label: p.name,
            }))}
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
