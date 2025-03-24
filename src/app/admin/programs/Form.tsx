'use client';

import { programLevels, programs } from '@/db/schema';
import { Form } from '@/components/adease';
import { Grid, Select, Textarea, TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { toTitleCase } from '@/lib/utils';

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
          <Grid>
            <Grid.Col span={3}>
              <TextInput label='Code' {...form.getInputProps('code')} />
            </Grid.Col>
            <Grid.Col span={9}>
              <TextInput label='Name' {...form.getInputProps('name')} />
            </Grid.Col>
          </Grid>
          <Select
            label='Level'
            {...form.getInputProps('level')}
            data={programLevels.map((level) => ({
              value: level,
              label: toTitleCase(level),
            }))}
          />
          <TextInput label='Faculty' {...form.getInputProps('faculty')} />
          <Textarea
            rows={4}
            label='Description'
            {...form.getInputProps('description')}
          />
        </>
      )}
    </Form>
  );
}
