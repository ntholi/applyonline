import BaseRepository from '@/server/base/BaseRepository';
import { applications } from '@/db/schema';
import { db } from '@/db';

export default class ApplicationRepository extends BaseRepository<
  typeof applications,
  'id'
> {
  constructor() {
    super(applications, 'id');
  }

  override findById(id: number) {
    return db.query.applications.findFirst({
      where: (applications, { eq }) => eq(applications.id, id),
      with: {
        student: true,
        firstChoice: true,
        secondChoice: true,
      },
    });
  }
}

export const applicationsRepository = new ApplicationRepository();
