'use server';

import { students } from '@/db/schema';
import { studentsService as service } from './service';
import { auth } from '@/auth';

type Student = Omit<typeof students.$inferInsert, 'userId'> & {
  userId?: string;
};

export async function getStudent(id: string) {
  return service.get(id);
}

export async function getStudentByUserId(userId: string | undefined) {
  return service.getByUserId(userId);
}

export async function findAllStudents(page: number = 1, search = '') {
  return service.findAll({ page, search });
}

export async function createStudent(student: Student) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('User not found');
  }

  const existingStudent = await service.getByUserId(session.user.id);

  if (existingStudent) {
    return service.update(existingStudent.id, {
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

export async function deleteStudent(id: string) {
  return service.delete(id);
}
