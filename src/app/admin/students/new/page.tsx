import { Box } from '@mantine/core';
import Form from '../Form';
import { createStudent } from '@/server/students/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Student'} onSubmit={createStudent} />
    </Box>
  );
}