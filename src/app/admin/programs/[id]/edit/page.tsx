import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getProgram, updateProgram } from '@/server/programs/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProgramEdit({ params }: Props) {
  const { id } = await params;
  const program = await getProgram(Number(id));
  if (!program) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Program'}
        defaultValues={program}
        onSubmit={async (value) => {
          'use server';
          return await updateProgram(Number(id), value);
        }}
      />
    </Box>
  );
}