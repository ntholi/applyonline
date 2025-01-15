import { Box } from '@mantine/core';
import Form from '../Form';
import { createProgram } from '@/server/programs/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Program'} onSubmit={createProgram} />
    </Box>
  );
}