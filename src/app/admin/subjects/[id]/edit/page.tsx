import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getSubject, updateSubject } from '@/server/subjects/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SubjectEdit({ params }: Props) {
  const { id } = await params;
  const subject = await getSubject(Number(id));
  if (!subject) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Subject'}
        defaultValues={subject}
        onSubmit={async (value) => {
          'use server';
          return await updateSubject(Number(id), value);
        }}
      />
    </Box>
  );
}