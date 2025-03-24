import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getApplication, updateApplication } from '@/server/applications/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ApplicationEdit({ params }: Props) {
  const { id } = await params;
  const application = await getApplication(Number(id));
  if (!application) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Application'}
        defaultValues={application}
        onSubmit={async (value) => {
          'use server';
          return await updateApplication(Number(id), value);
        }}
      />
    </Box>
  );
}