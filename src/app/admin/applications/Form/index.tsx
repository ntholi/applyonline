'use client';

import { applications } from '@/db/schema';
import { Form } from '@/components/adease';
import { Button, FileInput, Grid, GridCol, TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { DateInput } from '@mantine/dates';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { extractData } from '@/server/applications/ai-staff';
import { IconFileUpload } from '@tabler/icons-react';
import DataExtractor from './DataExtractor';

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
          <DataExtractor />
        </>
      )}
    </Form>
  );
}
