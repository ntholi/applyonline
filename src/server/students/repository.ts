import { db } from '@/db';
import {
  studentDetails,
  studentQualifications,
  studentSubjects,
} from '@/db/schema';
import BaseRepository from '@/server/base/BaseRepository';
import { StudentQualification } from './types';
import { eq } from 'drizzle-orm';

export default class StudentRepository extends BaseRepository<
  typeof studentDetails,
  'userId'
> {
  constructor() {
    super(studentDetails, 'userId');
  }

  override async findById(id: string) {
    return await db.query.studentDetails.findFirst({
      where: eq(studentDetails.userId, id),
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
          userId: qualification.userId,
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
