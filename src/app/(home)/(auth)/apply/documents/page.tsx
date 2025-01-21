import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DocumentForm from './document-form';
import { getStudentByUserId } from '@/server/students/actions';

export default async function DocumentsPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/login');
  }

  const student = await getStudentByUserId(session?.user?.id);

  if (!student) {
    redirect('/apply/student-details');
  }

  return (
    <div className='container py-6'>
      <DocumentForm studentId={student.id} />
    </div>
  );
}
