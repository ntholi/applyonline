import { db } from '@/db';
import {
  studentInfo,
  studentQualifications,
  studentSubjects,
} from '@/db/schema';
import BaseRepository from '@/server/base/BaseRepository';
import { StudentQualification } from './types';

export default class StudentRepository extends BaseRepository<
  typeof studentInfo,
  'userId'
> {
  constructor() {
    super(studentInfo, 'userId');
  }

  override async findById(id: string) {
    return await db.query.studentInfo.findFirst({
      where: (studentInfo, { eq }) => eq(studentInfo.userId, id),
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
