'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { applications, applicationSteps } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getCurrentStep() {
  const session = await auth();
  if (!session?.user?.id) return 1;

  const application = await db.query.applications.findFirst({
    where: eq(applications.userId, session.user.id),
    orderBy: (applications, { desc }) => [desc(applications.id)],
  });

  if (!application) return 1;
  return (
    applicationSteps.findIndex((step) => step.id === application.currentStep) +
    1
  );
}
