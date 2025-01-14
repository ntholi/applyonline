import { Box } from '@mantine/core';
import Form from '../Form';
import { createQualification } from '@/server/qualifications/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Qualification'} onSubmit={createQualification} />
    </Box>
  );
}
