import { Box } from '@mantine/core';
import Form from '../Form';
import { createApplication } from '@/server/applications/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Application'} onSubmit={createApplication} />
    </Box>
  );
}