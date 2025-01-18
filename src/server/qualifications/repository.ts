import { Qualification } from '@/app/admin/qualifications/types';
import { db } from '@/db';
import { qualifications, subjects, qualificationGrades } from '@/db/schema';
import BaseRepository, { FindAllParams } from '@/server/base/BaseRepository';
import { eq } from 'drizzle-orm';

export default class QualificationRepository extends BaseRepository<
  typeof qualifications,
  'id'
> {
  constructor() {
    super(qualifications, 'id');
  }

  override async findById(id: number) {
    return db.query.qualifications.findFirst({
      where: (qualifications, { eq }) => eq(qualifications.id, id),
      with: {
        subjects: true,
        grades: true,
      },
    });
  }

  override async findAll(params: FindAllParams<typeof qualifications>) {
    const { orderByExpressions, whereCondition, offset, pageSize } =
      await this.queryExpressions(params);

    const data = await db.query.qualifications.findMany({
      with: {
        subjects: true,
        grades: true,
      },
      orderBy: orderByExpressions,
      where: whereCondition,
      limit: pageSize,
      offset,
    });

    return await this.paginatedResults(data, whereCondition, pageSize);
  }

  override async create(data: Qualification) {
    const inserted = await db.transaction(async (tx) => {
      const {
        subjects: subjectsData,
        grades: gradesData,
        ...qualification
      } = data;
      const [inserted] = await tx
        .insert(qualifications)
        .values(qualification)
        .returning();

      if (subjectsData && subjectsData.length > 0) {
        await tx
          .insert(subjects)
          .values(
            subjectsData.map((s) => ({ ...s, qualificationId: inserted.id }))
          )
          .returning();
      }

      if (gradesData && gradesData.length > 0) {
        await tx
          .insert(qualificationGrades)
          .values(
            gradesData.map((g) => ({ ...g, qualificationId: inserted.id }))
          )
          .returning();
      }

      return inserted;
    });
    return inserted;
  }

  async update(id: number, data: Qualification) {
    return db.transaction(async (tx) => {
      const {
        subjects: subjectsData,
        grades: gradesData,
        ...qualification
      } = data;

      const [updated] = await tx
        .update(qualifications)
        .set({ ...qualification, updatedAt: new Date() })
        .where(eq(qualifications.id, id))
        .returning();

      await tx.delete(subjects).where(eq(subjects.qualificationId, id));

      if (subjectsData && subjectsData.length > 0) {
        await tx.insert(subjects).values(
          subjectsData.map((s) => ({
            ...s,
            qualificationId: id,
            updatedAt: new Date(),
          }))
        );
      }

      await tx
        .delete(qualificationGrades)
        .where(eq(qualificationGrades.qualificationId, id));

      if (gradesData && gradesData.length > 0) {
        await tx.insert(qualificationGrades).values(
          gradesData.map((g) => ({
            ...g,
            qualificationId: id,
            updatedAt: new Date(),
          }))
        );
      }

      return updated;
    });
  }
}

export const qualificationsRepository = new QualificationRepository();
