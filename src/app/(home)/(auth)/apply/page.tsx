import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ApplyPage() {
  const session = await auth();
  if (!session) {
    return (
      <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4'>
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-semibold'>Access Restricted</h1>
          <p>Please sign in to access the application form.</p>
        </div>
      </div>
    );
  }

  return redirect('/apply/student-details');
}
