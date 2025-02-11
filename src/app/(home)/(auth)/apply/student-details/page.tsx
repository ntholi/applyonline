import { auth } from '@/auth';
import { Metadata } from 'next';
import StudentForm from './StudentForm';
import { redirect } from 'next/navigation';
import { getStudent } from '@/server/students/actions';

export const metadata: Metadata = {
  title: 'Personal Details | Apply',
  description: 'Enter your personal details to start your application',
};

export default async function StudentDetailsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect('/login');
  }
  if (!session.user.applicationId) {
    redirect('/apply');
  }
  const student = await getStudent(session?.user?.id);

  return <StudentForm initialData={student} />;
}
