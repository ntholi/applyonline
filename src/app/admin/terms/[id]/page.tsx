import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getTerm, deleteTerm } from '@/server/terms/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TermDetails({ params }: Props) {
  const { id } = await params;
  const term = await getTerm(Number(id));
  
  if (!term) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Term'} 
        queryKey={['terms']}
        handleDelete={async () => {
          'use server';
          await deleteTerm(Number(id));
        }}
      />
      <DetailsViewBody>
        <FieldView label='Name'>{term.name}</FieldView>
        <FieldView label='Is Active'>{term.isActive}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}