import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getDocument, updateDocument } from '@/server/documents/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DocumentEdit({ params }: Props) {
  const { id } = await params;
  const document = await getDocument(Number(id));
  if (!document) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Document'}
        defaultValues={document}
        onSubmit={async (value) => {
          'use server';
          return await updateDocument(Number(id), value);
        }}
      />
    </Box>
  );
}