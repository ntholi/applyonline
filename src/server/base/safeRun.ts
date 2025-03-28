'use server';

import { auth } from '@/auth';
import { users } from '@/db/schema/auth';
import { Session } from 'next-auth';
import { forbidden, unauthorized } from 'next/navigation';
import { createServiceLogger } from './logger';

type Role = (typeof users.$inferSelect)['role'] | 'all';

/**
 * Higher-order function that wraps service operations with both authentication and logging
 * @param operation - The service operation to execute
 * @param serviceName - The name of the service (for namespacing logs)
 * @param operationName - The name of the operation being performed
 * @param roles - Array of roles that are allowed to perform this operation
 * @param params - Optional parameters to log
 * @param accessCheck - Optional function to perform additional access checks
 */
export default async function safeRun<T>(
  operation: () => Promise<T>,
  serviceName: string,
  operationName: string,
  roles: Role[] = [],
  params?: Record<string, any>,
  accessCheck?: (session: Session | null) => Promise<boolean>
): Promise<T> {
  const logger = createServiceLogger(serviceName);
  const startTime = Date.now();

  logger.info(`Starting ${operationName}`, params);

  try {
    const session = await auth();

    if (!roles.includes('all')) {
      if (!session?.user) {
        logAuthError(logger, session, roles, operationName, params);
        return unauthorized();
      }

      if (!['admin', ...roles].includes(session.user.role as Role)) {
        logAuthError(logger, session, roles, operationName, params);
        return forbidden();
      }

      if (accessCheck && session.user.role !== 'admin') {
        const isAuthorized = await accessCheck(session);
        if (!isAuthorized) {
          logAuthError(logger, session, roles, operationName, params);
          return forbidden();
        }
      }
    }

    const result = await operation();

    const duration = Date.now() - startTime;
    logger.info(`Completed ${operationName} in ${duration}ms`, {
      success: true,
      duration,
    });

    return result;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    logger.error(
      `Failed ${operationName} after ${duration}ms: ${error.message}`,
      {
        success: false,
        duration,
        error: error.message,
        ...params,
      }
    );
    throw error;
  }
}

function logAuthError(
  logger: ReturnType<typeof createServiceLogger>,
  session: Session | null,
  roles: Role[],
  operationName: string,
  params?: Record<string, any>
) {
  logger.error(`Auth Error - ${operationName}`, {
    currentRole: session?.user?.role,
    userEmail: session?.user?.email,
    expectedRoles: ['admin', ...roles],
    ...params,
  });
}
