'use client';

import { Form } from '@/components/adease';
import { programs } from '@/db/schema';
import {
  Container,
  Paper,
  Select,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Textarea,
  rem,
} from '@mantine/core';
import { IconBooks, IconInfoSquare } from '@tabler/icons-react';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { faculties } from '../data/faculties';
import { getProgramByFaculty } from '../data/programs';
import { Program } from '../types';
import QualificationsForm from './QualificationsForm';

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
    <Container size='lg' py='xl'>
      <Paper shadow='sm' p='xl' radius='md' withBorder>
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
            <Stack>
              <Tabs defaultValue='basic' variant='outline'>
                <TabsList>
                  <TabsTab
                    value='basic'
                    leftSection={
                      <IconInfoSquare
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    }
                  >
                    Basic Information
                  </TabsTab>
                  <TabsTab
                    value='qualifications'
                    leftSection={
                      <IconBooks style={{ width: rem(16), height: rem(16) }} />
                    }
                  >
                    Qualifications
                  </TabsTab>
                </TabsList>

                <Paper p='md' mt='md'>
                  <TabsPanel value='basic'>
                    <Stack gap='md'>
                      <Select
                        label='Faculty'
                        {...form.getInputProps('faculty')}
                        data={faculties.map((f) => ({
                          value: f.code,
                          label: f.name,
                        }))}
                        searchable
                        nothingFoundMessage='No faculty found'
                        clearable
                      />
                      <Select
                        label='Program Name'
                        {...form.getInputProps('name')}
                        data={getProgramByFaculty(
                          form?.values?.faculty as string
                        ).map((p) => ({
                          value: p.name,
                          label: p.name,
                        }))}
                        searchable
                        nothingFoundMessage='Please select a faculty first'
                        disabled={!form.values.faculty}
                        clearable
                      />
                      <Textarea
                        label='Program Description'
                        {...form.getInputProps('description')}
                        minRows={4}
                        autosize
                        maxRows={8}
                      />
                    </Stack>
                  </TabsPanel>
                  <TabsPanel value='qualifications'>
                    <QualificationsForm form={form} />
                  </TabsPanel>
                </Paper>
              </Tabs>
            </Stack>
          )}
        </Form>
      </Paper>
    </Container>
  );
}
