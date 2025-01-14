import { DetailsView, DetailsViewHeader, FieldView } from '@/components/adease';
import {
  deleteQualification,
  getQualification,
} from '@/server/qualifications/actions';
import { Box, Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { IconBooks, IconInfoSquare } from '@tabler/icons-react';
import { notFound } from 'next/navigation';
import SubjectsTable from './SubjectsTable';
import GradesTable from './GradesTable';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QualificationDetails({ params }: Props) {
  const { id } = await params;
  const qualification = await getQualification(Number(id));

  if (!qualification) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader
        title={'Qualification'}
        queryKey={['qualifications']}
        handleDelete={async () => {
          'use server';
          await deleteQualification(Number(id));
        }}
      />
      <Box p='sm'>
        <Tabs defaultValue='basic'>
          <TabsList>
            <TabsTab value='basic' leftSection={<IconInfoSquare size='1rem' />}>
              Basic Info
            </TabsTab>
            <TabsTab value='subjects' leftSection={<IconBooks size='1rem' />}>
              Subjects
            </TabsTab>
            <TabsTab value='grades' leftSection={<IconBooks size='1rem' />}>
              Grades
            </TabsTab>
          </TabsList>
          <TabsPanel value='basic' pt='xl'>
            <FieldView label='Name'>{qualification.name}</FieldView>
          </TabsPanel>
          <TabsPanel value='subjects' pt='xl'>
            <SubjectsTable subjects={qualification.subjects} />
          </TabsPanel>
          <TabsPanel value='grades' pt='xl'>
            <GradesTable grades={qualification.grades} />
          </TabsPanel>
        </Tabs>
      </Box>
    </DetailsView>
  );
}
