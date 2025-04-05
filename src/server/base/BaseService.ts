import { auth } from '@/auth';
import { users } from '@/db/schema/auth';
import { Session } from 'next-auth';
import { forbidden, unauthorized } from 'next/navigation';

export type Role = (typeof users.$inferSelect)['role'] | 'all';

export class BaseService {
  protected async checkAuth(
    roles: Role[] = [],
    accessCheck?: (session: Session | null) => Promise<boolean>
  ) {
    const session = await auth();

    if (!roles.includes('all')) {
      if (!session?.user) {
        return unauthorized();
      }

      if (!['admin', ...roles].includes(session.user.role as Role)) {
        return forbidden();
      }

      if (accessCheck && session.user.role !== 'admin') {
        const isAuthorized = await accessCheck(session);
        if (!isAuthorized) {
          return forbidden();
        }
      }
    }

    return session;
  }
}
