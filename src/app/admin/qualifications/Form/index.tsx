'use client';

import { Form } from '@/components/adease';
import { qualifications } from '@/db/schema';
import { Tabs, TabsList, TabsPanel, TabsTab, TextInput } from '@mantine/core';
import { IconBooks, IconInfoSquare } from '@tabler/icons-react';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { Qualification } from '../types';
import SubjectsForm from './SubjectsForm';

type Props = {
  onSubmit: (values: Qualification) => Promise<Qualification>;
  defaultValues?: Qualification;
  onSuccess?: (value: Qualification) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
  ) => void;
  title?: string;
};

export default function QualificationForm({
  onSubmit,
  defaultValues,
  title,
}: Props) {
  const router = useRouter();

  return (
    <Form
      title={title}
      action={onSubmit}
      queryKey={['qualifications']}
      schema={createInsertSchema(qualifications)}
      defaultValues={
        defaultValues ?? {
          subjects: [],
        }
      }
      onSuccess={({ id }) => {
        router.push(`/admin/qualifications/${id}`);
      }}
      p={'sm'}
    >
      {(form) => (
        <Tabs defaultValue='basic'>
          <TabsList>
            <TabsTab value='basic' leftSection={<IconInfoSquare size='1rem' />}>
              Basic Info
            </TabsTab>
            <TabsTab value='subjects' leftSection={<IconBooks size='1rem' />}>
              Subjects
            </TabsTab>
          </TabsList>
          <TabsPanel value='basic' pt='lg'>
            <TextInput label='Name' {...form.getInputProps('name')} />
          </TabsPanel>
          <TabsPanel value='subjects' pt='lg'>
            <SubjectsForm form={form} />
          </TabsPanel>
        </Tabs>
      )}
    </Form>
  );
}
