import { auth } from '@/auth';
import { getApplicationByUserId } from '@/server/applications/actions';
import { redirect } from 'next/navigation';
import ProgramsForm from './ProgramsForm';

export default async function ProgramsPage() {
  const session = await auth();
  const application = await getApplicationByUserId(session?.user?.id);

  if (!session?.user?.id) {
    return redirect('/login');
  }

  return <ProgramsForm userId={session.user.id} application={application} />;
}
