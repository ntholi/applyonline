import { auth } from '@/auth';
import { getApplicationByStudentId } from '@/server/applications/actions';
import { redirect } from 'next/navigation';
import ProgramsForm from './ProgramsForm';

export default async function ProgramsPage() {
  const session = await auth();
  const application = await getApplicationByStudentId(session?.user?.studentId);

  if (!session?.user?.studentId) {
    return redirect('/apply/student-details');
  }

  return (
    <ProgramsForm
      studentId={session.user.studentId}
      application={application}
    />
  );
}
