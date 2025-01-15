import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getProgram, deleteProgram } from '@/server/programs/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProgramDetails({ params }: Props) {
  const { id } = await params;
  const program = await getProgram(id);

  if (!program) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader
        title={'Program'}
        queryKey={['programs']}
        handleDelete={async () => {
          'use server';
          await deleteProgram(id);
        }}
      />
      <DetailsViewBody>
        <FieldView label='Name'>{program.name}</FieldView>
        <FieldView label='Faculty'>{program.faculty?.toUpperCase()}</FieldView>
        <FieldView label='Description'>{program.description}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}
