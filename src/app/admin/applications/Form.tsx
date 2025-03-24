'use client';

import { applications } from '@/db/schema';
import { Form } from '@/components/adease';
import { Button, FileInput, Grid, GridCol, TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { DateInput } from '@mantine/dates';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { extractData } from '@/server/applications/ai-staff';

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

export default function ApplicationForm({
  onSubmit,
  defaultValues,
  title,
}: Props) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  async function extractDate() {
    if (!file) return;
    const text = await extractData(file);
    console.log(text);
  }

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
          <Grid align='end'>
            <GridCol span={10}>
              <FileInput
                label='Document'
                value={file}
                onChange={(file) => setFile(file)}
              />
            </GridCol>
            <GridCol span={2}>
              <Button type='button' onClick={extractDate}>
                Extract
              </Button>
            </GridCol>
          </Grid>
        </>
      )}
    </Form>
  );
}
