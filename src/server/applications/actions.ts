'use server';

import { db } from '@/db';
import { applications } from '@/db/schema';

export type CreateApplicationInput = {
  studentId: number;
  firstChoiceId: number;
  secondChoiceId: number;
};

export async function createApplication(input: CreateApplicationInput) {
  return db
    .insert(applications)
    .values({
      studentId: input.studentId,
      firstChoiceId: input.firstChoiceId,
      secondChoiceId: input.secondChoiceId,
    })
    .returning()
    .get();
}

export async function getApplicationByStudentId(studentId: number) {
  return db.query.applications.findFirst({
    where: (applications, { eq }) => eq(applications.studentId, studentId),
    with: {
      firstChoice: true,
      secondChoice: true,
    },
  });
}
