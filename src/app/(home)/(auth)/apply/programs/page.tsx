import { auth } from '@/auth';
import { getApplicationByUserId } from '@/server/applications/actions';
import { redirect } from 'next/navigation';
import ProgramsForm from './ProgramsForm';

export default async function ProgramsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect('/login');
  }
  const application = await getApplicationByUserId(session?.user?.id);
  if (!application) {
    redirect('/apply');
  }

  return <ProgramsForm userId={session.user.id} application={application} />;
}
