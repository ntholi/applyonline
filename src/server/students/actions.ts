'use server';

import { studentInfo } from '@/db/schema';
import { studentsService as service } from './service';
import { auth } from '@/auth';
import { StudentQualification } from './types';

type Student = Omit<typeof studentInfo.$inferInsert, 'userId'> & {
  userId?: string;
};

export async function getStudent(userId: string) {
  return service.get(userId);
}

export async function findAllStudents(page: number = 1, search = '') {
  return service.findAll({ page, search });
}

export async function createStudent(student: Student) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('User not found');
  }

  const existing = await service.get(session.user.id);
  if (existing) {
    return service.update(existing.userId, {
      ...student,
      userId: session.user.id,
    });
  }
  return service.create({ ...student, userId: session.user.id });
}

export async function updateStudent(id: string, student: Student) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('User not found');
  }
  return service.update(id, { ...student, userId: session.user.id });
}

export async function saveStudentQualification(value: StudentQualification) {
  return service.saveQualification(value);
}

export async function deleteStudent(id: string) {
  return service.delete(id);
}
