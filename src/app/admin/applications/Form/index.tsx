'use client';

import { Form } from '@/components/adease';
import { applications } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
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
      {() => (
        <>
          <DataExtractor />
        </>
      )}
    </Form>
  );
}
