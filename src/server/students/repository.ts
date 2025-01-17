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

  override async findById(id: number) {
    return await db.query.students.findFirst({
      where: (students, { eq }) => eq(students.id, id),
      with: {
        applications: true,
        qualifications: true,
      },
    });
  }

  async findByUserId(userId: string | undefined) {
    if (!userId) return undefined;
    return await db.query.students.findFirst({
      where: (students, { eq }) => eq(students.userId, userId),
      with: {
        applications: true,
        qualifications: true,
      },
    });
  }
}

export const studentsRepository = new StudentRepository();
