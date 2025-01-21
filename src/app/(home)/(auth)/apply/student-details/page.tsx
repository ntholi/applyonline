import { auth } from '@/auth';
import { getStudentByUserId } from '@/server/students/actions';
import { Metadata } from 'next';
import StudentForm from './StudentForm';

export const metadata: Metadata = {
  title: 'Personal Details | Apply',
  description: 'Enter your personal details to start your application',
};

export default async function StudentDetailsPage() {
  const session = await auth();
  const student = await getStudentByUserId(session?.user?.id);

  return <StudentForm initialData={student} />;
}
