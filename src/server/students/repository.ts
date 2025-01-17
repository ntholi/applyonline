import BaseRepository from '@/server/base/BaseRepository';
import { students } from '@/db/schema';
import { db } from '@/db';

export default class StudentRepository extends BaseRepository<
  typeof students,
  'id'
> {
  constructor() {
    super(students, 'id');
  }

  async findByUserId(userId: string | undefined) {
    if (!userId) return undefined;
    return await db.query.students.findFirst({
      where: (students, { eq }) => eq(students.userId, userId),
    });
  }
}

export const studentsRepository = new StudentRepository();
