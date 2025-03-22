'use server';

import { auth } from '@/auth';
import { users } from '@/db/schema/auth';
import { Session } from 'next-auth';
import { forbidden, unauthorized } from 'next/navigation';

type Role = (typeof users.$inferSelect)['role'] | 'all';

export default async function withAuth<T>(
  fn: () => Promise<T>,
  roles: Role[] = [],
  accessCheck?: (session: Session | null) => Promise<boolean>
) {
  const session = await auth();
  const method = fn.toString();

  if (roles.includes('all')) {
    return fn();
  }

  if (!session?.user) {
    logError(session, roles, method);
    return unauthorized();
  }

  if (!['admin', ...roles].includes(session.user.role as Role)) {
    logError(session, roles, method);
    return forbidden();
  }

  if (accessCheck && session.user.role !== 'admin') {
    const isAuthorized = await accessCheck(session);
    if (!isAuthorized) {
      logError(session, roles, method);
      return forbidden();
    }
  }

  return fn();
}

function logError(session: Session | null, roles: Role[], method: string) {
  console.error('Auth Error', method, {
    currentRole: session?.user?.role,
    userEmail: session?.user?.email,
    expectedRoles: ['admin', ...roles],
  });
}
