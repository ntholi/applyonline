import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getProgram, updateProgram } from '@/server/programs/actions';
import { Program } from '../../types';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProgramEdit({ params }: Props) {
  const { id } = await params;
  const programData = await getProgram(id);
  if (!programData) {
    return notFound();
  }

  const program = {
    ...programData,
    programQualifications: programData.qualifications,
  };

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Program'}
        defaultValues={program}
        onSubmit={async (value) => {
          'use server';
          return (await updateProgram(id, value)) as Program;
        }}
      />
    </Box>
  );
}
