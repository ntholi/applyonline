'use client';

import { Form } from '@/components/adease';
import { programs } from '@/db/schema';
import {
  Select,
  Textarea,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
} from '@mantine/core';
import { IconBooks, IconInfoSquare } from '@tabler/icons-react';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { faculties } from '../data/faculties';
import { getProgramByFaculty } from '../data/programs';
import { Program } from '../types';
import { ProgramQualificationsForm } from './ProgramQualificationsForm';

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
      defaultValues={
        defaultValues ?? {
          programQualifications: [],
        }
      }
      onSuccess={({ id }) => {
        router.push(`/admin/programs/${id}`);
      }}
    >
      {(form) => (
        <Tabs defaultValue='basic'>
          <TabsList>
            <TabsTab value='basic' leftSection={<IconInfoSquare size='1rem' />}>
              Basic Info
            </TabsTab>
            <TabsTab
              value='qualifications'
              leftSection={<IconBooks size='1rem' />}
            >
              Qualifications
            </TabsTab>
          </TabsList>
          <TabsPanel value='basic' pt='lg'>
            <Select
              label='Faculty'
              {...form.getInputProps('faculty')}
              data={faculties.map((f) => ({ value: f.code, label: f.name }))}
            />
            <Select
              label='Name'
              {...form.getInputProps('name')}
              data={getProgramByFaculty(form?.values?.faculty as string).map(
                (p) => ({
                  value: p.name,
                  label: p.name,
                })
              )}
            />
            <Textarea
              label='Description'
              {...form.getInputProps('description')}
            />
          </TabsPanel>
          <TabsPanel value='qualifications' pt='lg'>
            <ProgramQualificationsForm form={form} />
          </TabsPanel>
        </Tabs>
      )}
    </Form>
  );
}
