import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getStudent, updateStudent } from '@/server/students/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentEdit({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);
  if (!student) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Student'}
        defaultValues={student}
        onSubmit={async (value) => {
          'use server';
          return await updateStudent(id, value);
        }}
      />
    </Box>
  );
}