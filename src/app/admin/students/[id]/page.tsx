import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getStudent, deleteStudent } from '@/server/students/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentDetails({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);
  
  if (!student) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Student'} 
        queryKey={['students']}
        handleDelete={async () => {
          'use server';
          await deleteStudent(id);
        }}
      />
      <DetailsViewBody>
        <FieldView label='National Id'>{student.nationalId}</FieldView>
        <FieldView label='Name'>{student.name}</FieldView>
        <FieldView label='Email'>{student.email}</FieldView>
        <FieldView label='Phone1'>{student.phone1}</FieldView>
        <FieldView label='Phone2'>{student.phone2}</FieldView>
        <FieldView label='Religion'>{student.religion}</FieldView>
        <FieldView label='Date Of Birth'>{student.dateOfBirth}</FieldView>
        <FieldView label='Gender'>{student.gender}</FieldView>
        <FieldView label='Marital Status'>{student.maritalStatus}</FieldView>
        <FieldView label='Birth Place'>{student.birthPlace}</FieldView>
        <FieldView label='Home Town'>{student.homeTown}</FieldView>
        <FieldView label='High School'>{student.highSchool}</FieldView>
        <FieldView label='Next Of Kin Names'>{student.nextOfKinNames}</FieldView>
        <FieldView label='Next Of Kin Phone'>{student.nextOfKinPhone}</FieldView>
        <FieldView label='Next Of Kin Relationship'>{student.nextOfKinRelationship}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}