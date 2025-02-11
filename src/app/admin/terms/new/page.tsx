import { Box } from '@mantine/core';
import Form from '../Form';
import { createTerm } from '@/server/terms/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Term'} onSubmit={createTerm} />
    </Box>
  );
}