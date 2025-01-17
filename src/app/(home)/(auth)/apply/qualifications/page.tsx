import { Metadata } from 'next';
import SubjectsForm from './subjects-form';
import { auth } from '@/auth';
import { getStudentByUserId } from '@/server/students/actions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Academic Qualifications | Apply',
  description: 'Enter your academic qualifications',
};

export default async function QualificationsPage() {
  const session = await auth();
  const student = await getStudentByUserId(session?.user?.id);

  if (!student) {
    return redirect('/apply/student-details');
  }

  return <SubjectsForm studentId={student.id} />;
}
