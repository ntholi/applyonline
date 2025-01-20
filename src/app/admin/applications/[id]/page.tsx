import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getApplication, deleteApplication } from '@/server/applications/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ApplicationDetails({ params }: Props) {
  const { id } = await params;
  const application = await getApplication(Number(id));
  
  if (!application) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Application'} 
        queryKey={['applications']}
        handleDelete={async () => {
          'use server';
          await deleteApplication(Number(id));
        }}
      />
      <DetailsViewBody>
        <FieldView label='Student'>{application.student}</FieldView>
        <FieldView label='First Choise'>{application.firstChoise}</FieldView>
        <FieldView label='Second Chose'>{application.secondChose}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}