import { Qualification } from '@/app/admin/qualifications/types';
import { db } from '@/db';
import { qualifications, subjects } from '@/db/schema';
import BaseRepository from '@/server/base/BaseRepository';

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
      },
    });
  }

  override async create(data: Qualification) {
    const inserted = await db.transaction(async (tx) => {
      const { subjects: subjectsData, ...qualification } = data;
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
      return inserted;
    });
    return inserted;
  }
}

export const qualificationsRepository = new QualificationRepository();
