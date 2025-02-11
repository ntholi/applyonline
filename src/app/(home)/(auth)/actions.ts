'use server';

import { db } from '@/db';
import { applications } from '@/db/schema';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function createApplication() {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect('/login');
  }

  await db.insert(applications).values({
    userId: session.user.id,
    status: 'pending',
  });

  redirect('/apply/student-details');
}
