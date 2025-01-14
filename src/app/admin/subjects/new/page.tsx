import { Box } from '@mantine/core';
import Form from '../Form';
import { createSubject } from '@/server/subjects/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Subject'} onSubmit={createSubject} />
    </Box>
  );
}