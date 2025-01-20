import { db } from '@/db';
import { studentQualifications, students, studentSubjects } from '@/db/schema';
import BaseRepository from '@/server/base/BaseRepository';
import { StudentQualification } from './types';

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
        application: true,
        qualifications: true,
      },
    });
  }

  async findByUserId(userId: string | undefined) {
    if (!userId) return undefined;
    return await db.query.students.findFirst({
      where: (students, { eq }) => eq(students.userId, userId),
      with: {
        application: true,
        qualifications: true,
      },
    });
  }

  async saveQualification(qualification: StudentQualification) {
    const { studentSubjects: subjects } = qualification;
    return await db.transaction(async (tx) => {
      const [saved] = await tx
        .insert(studentQualifications)
        .values({
          studentId: qualification.studentId,
          qualificationId: qualification.qualificationId,
        })
        .returning();

      if (subjects.length > 0) {
        await tx
          .insert(studentSubjects)
          .values(
            subjects.map((s) => ({
              ...s,
              studentQualificationId: saved.id,
            })),
          )
          .returning();
      }

      return saved;
    });
  }
}

export const studentsRepository = new StudentRepository();
