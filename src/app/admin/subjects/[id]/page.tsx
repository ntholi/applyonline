import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getSubject, deleteSubject } from '@/server/subjects/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SubjectDetails({ params }: Props) {
  const { id } = await params;
  const subject = await getSubject(Number(id));
  
  if (!subject) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Subject'} 
        queryKey={['subjects']}
        handleDelete={async () => {
          'use server';
          await deleteSubject(Number(id));
        }}
      />
      <DetailsViewBody>
        <FieldView label='Name'>{subject.name}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}