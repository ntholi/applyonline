'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { applications } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { applicationSteps } from './steps';

export async function getCurrentStep() {
  const session = await auth();
  if (!session?.user?.id) return 1;

  const ap = await db.query.applications.findFirst({
    where: eq(applications.userId, session.user.id),
    orderBy: (applications, { desc }) => [desc(applications.id)],
  });

  if (!ap) return 1;
  return applicationSteps.findIndex((step) => step.id === ap.currentStep) + 1;
}

export async function updateApplicationStep(step: number) {
  const session = await auth();
  if (!session?.user?.id) return;
  const ap = await db.query.applications.findFirst({
    where: eq(applications.userId, session.user.id),
  });

  if (!ap) return;
  await db
    .update(applications)
    .set({ currentStep: step })
    .where(eq(applications.id, ap.id));
}
