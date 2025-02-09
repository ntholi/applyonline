import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DocumentForm from './DocumentForm';

export default async function DocumentsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <div className='container py-6'>
      <DocumentForm userId={session.user.id} />
    </div>
  );
}
