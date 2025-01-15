import { Box } from '@mantine/core';
import Form from '../Form';
import { createQualification } from '@/server/qualifications/actions';
import { Qualification } from '../types';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form
        title={'Create Qualification'}
        onSubmit={async (value) => {
          'use server';
          return (await createQualification(value)) as Qualification;
        }}
      />
    </Box>
  );
}
