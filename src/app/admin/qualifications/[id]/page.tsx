import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getQualification, deleteQualification } from '@/server/qualifications/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QualificationDetails({ params }: Props) {
  const { id } = await params;
  const qualification = await getQualification(Number(id));
  
  if (!qualification) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Qualification'} 
        queryKey={['qualifications']}
        handleDelete={async () => {
          'use server';
          await deleteQualification(Number(id));
        }}
      />
      <DetailsViewBody>
        <FieldView label='Name'>{qualification.name}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}