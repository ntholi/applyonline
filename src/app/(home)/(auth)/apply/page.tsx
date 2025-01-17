import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default async function ApplyPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SessionComponent />
    </Suspense>
  );
}

async function SessionComponent() {
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

function LoadingState() {
  return (
    <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4'>
      <Loader2 className='h-6 w-6 animate-spin text-primary' />
      <p className='mt-2 text-sm text-muted-foreground'>Loading...</p>
    </div>
  );
}