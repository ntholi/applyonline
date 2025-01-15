import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import {
  getQualification,
  updateQualification,
} from '@/server/qualifications/actions';
import { Qualification } from '../../types';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QualificationEdit({ params }: Props) {
  const { id } = await params;
  const qualification = await getQualification(Number(id));
  if (!qualification) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Qualification'}
        defaultValues={qualification}
        onSubmit={async (value) => {
          'use server';
          return (await updateQualification(
            Number(id),
            value
          )) as Qualification;
        }}
      />
    </Box>
  );
}
