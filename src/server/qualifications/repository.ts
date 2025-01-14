import BaseRepository from '@/server/base/BaseRepository';
import { qualifications } from '@/db/schema';
import { db } from '@/db';

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
}

export const qualificationsRepository = new QualificationRepository();
