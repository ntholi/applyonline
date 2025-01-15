import { Program } from '@/app/admin/programs/types';
import { db } from '@/db';
import {
  programs,
  programQualifications,
  qualificationSubjects,
} from '@/db/schema';
import BaseRepository from '@/server/base/BaseRepository';
import { eq } from 'drizzle-orm';

export default class ProgramRepository extends BaseRepository<
  typeof programs,
  'id'
> {
  constructor() {
    super(programs, 'id');
  }

  override async findById(id: string) {
    return db.query.programs.findFirst({
      where: (programs, { eq }) => eq(programs.id, id),
      with: {
        qualifications: {
          with: {
            subjects: true,
          },
        },
      },
    });
  }

  override async create(data: Program) {
    const inserted = await db.transaction(async (tx) => {
      const { programQualifications: qualificationsData, ...program } = data;
      const [inserted] = await tx.insert(programs).values(program).returning();

      if (qualificationsData && qualificationsData.length > 0) {
        const insertedQualifications = await tx
          .insert(programQualifications)
          .values(
            qualificationsData.map((q) => ({
              ...q,
              programId: inserted.id,
            }))
          )
          .returning();

        for (let i = 0; i < qualificationsData.length; i++) {
          const qualification = qualificationsData[i];
          const insertedQualification = insertedQualifications[i];

          if (qualification.subjects && qualification.subjects.length > 0) {
            await tx.insert(qualificationSubjects).values(
              qualification.subjects.map((s) => ({
                ...s,
                programId: inserted.id,
                qualificationId: insertedQualification.qualificationId,
              }))
            );
          }
        }
      }

      return inserted;
    });

    return inserted;
  }

  async update(id: string, data: Program) {
    return db.transaction(async (tx) => {
      const { programQualifications: qualificationsData, ...program } = data;

      const [updated] = await tx
        .update(programs)
        .set({ ...program, updatedAt: new Date() })
        .where(eq(programs.id, id))
        .returning();

      await tx
        .delete(programQualifications)
        .where(eq(programQualifications.programId, id));

      if (qualificationsData && qualificationsData.length > 0) {
        const insertedQualifications = await tx
          .insert(programQualifications)
          .values(
            qualificationsData.map((q) => ({
              ...q,
              programId: id,
              updatedAt: new Date(),
            }))
          )
          .returning();

        for (let i = 0; i < qualificationsData.length; i++) {
          const qualification = qualificationsData[i];
          const insertedQualification = insertedQualifications[i];

          await tx
            .delete(qualificationSubjects)
            .where(eq(qualificationSubjects.programId, id));

          if (qualification.subjects && qualification.subjects.length > 0) {
            await tx.insert(qualificationSubjects).values(
              qualification.subjects.map((s) => ({
                ...s,
                programId: id,
                qualificationId: insertedQualification.qualificationId,
              }))
            );
          }
        }
      }

      return updated;
    });
  }
}

export const programsRepository = new ProgramRepository();
