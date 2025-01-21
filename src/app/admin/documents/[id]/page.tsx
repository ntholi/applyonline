import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getDocument, deleteDocument } from '@/server/documents/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DocumentDetails({ params }: Props) {
  const { id } = await params;
  const document = await getDocument(Number(id));
  
  if (!document) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Document'} 
        queryKey={['documents']}
        handleDelete={async () => {
          'use server';
          await deleteDocument(Number(id));
        }}
      />
      <DetailsViewBody>
        <FieldView label='Name'>{document.name}</FieldView>
        <FieldView label='File'>{document.file}</FieldView>
        <FieldView label='Type'>{document.type}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}