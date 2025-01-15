import { Box } from '@mantine/core';
import Form from '../Form';
import { createProgram } from '@/server/programs/actions';
import { Program } from '../types';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form
        title={'Create Program'}
        onSubmit={async (values) => {
          'use server';
          return (await createProgram(values)) as Program;
        }}
      />
    </Box>
  );
}
