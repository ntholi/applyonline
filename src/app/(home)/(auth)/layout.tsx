import { auth } from '@/auth';
import { Gradient } from '@/components/ui/gradient';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return <Gradient className='min-h-[calc(100vh-4rem)]'>{children}</Gradient>;
}
