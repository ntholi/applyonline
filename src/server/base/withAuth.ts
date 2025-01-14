'use server';

import { users } from '@/db/schema/users';
import { getServerSession } from '@/lib/auth/server';
import { forbidden, unauthorized } from 'next/navigation';

type Role = (typeof users.$inferSelect)['role'] | 'all';

export default async function withAuth<T>(
  fn: () => Promise<T>,
  roles: Role[] = [],
  accessCheck?: (
    session: NonNullable<Awaited<ReturnType<typeof getServerSession>>>,
  ) => Promise<boolean>,
) {
  const session = await getServerSession();
  const stack = new Error().stack;
  const callerLine = stack?.split('\n')[2] || '';
  const methodMatch = callerLine.match(/at\s+(.*?)\s+\(/);

  const method = methodMatch ? methodMatch[1] : 'unknown method';

  if (roles.includes('all')) {
    return fn();
  }

  if (!session?.user) {
    console.error(`Auth Error caused by ${method}`);
    return unauthorized();
  }

  if (
    roles.length > 0 &&
    !['admin', ...roles].includes(session.user.role as Role)
  ) {
    console.error(`Permission Error caused by ${method}`);
    return forbidden();
  }

  if (accessCheck && session.user.role !== 'admin') {
    const isAuthorized = await accessCheck(session);
    if (!isAuthorized) {
      console.error(`Custom Auth Check Failed by ${method}`);
      return forbidden();
    }
  }

  return fn();
}
