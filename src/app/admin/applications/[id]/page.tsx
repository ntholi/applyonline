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
        <FieldView label='User'>{application.user}</FieldView>
        <FieldView label='Status'>{application.status}</FieldView>
        <FieldView label='Submission Date'>{application.submissionDate}</FieldView>
        <FieldView label='Review Date'>{application.reviewDate}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}