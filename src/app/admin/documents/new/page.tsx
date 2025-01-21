import { Box } from '@mantine/core';
import Form from '../Form';
import { createDocument } from '@/server/documents/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Document'} onSubmit={createDocument} />
    </Box>
  );
}