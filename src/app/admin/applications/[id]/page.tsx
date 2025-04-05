import {
  DetailsView,
  DetailsViewBody,
  DetailsViewHeader,
  FieldView,
} from '@/components/adease';
import {
  deleteApplication,
  getApplication,
} from '@/server/applications/actions';
import { notFound } from 'next/navigation';

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
        <FieldView label='Status'>{application.status}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}
