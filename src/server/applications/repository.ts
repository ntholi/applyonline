import { db } from '@/db';
import { applications } from '@/db/schema';
import BaseRepository from '@/server/base/BaseRepository';
import { eq } from 'drizzle-orm';

export default class ApplicationRepository extends BaseRepository<
  typeof applications,
  'id'
> {
  constructor() {
    super(applications, 'id');
  }

  async findByUserId(userId: string) {
    return db.query.applications.findFirst({
      where: eq(applications.userId, userId),
      with: {
        programChoice: {
          with: {
            firstChoice: true,
            secondChoice: true,
          },
        },
      },
    });
  }

  override findById(id: number) {
    return db.query.applications.findFirst({
      where: (applications, { eq }) => eq(applications.id, id),
      with: {
        studentDetails: true,
        programChoice: {
          with: {
            firstChoice: true,
            secondChoice: true,
          },
        },
        documents: true,
        studentQualifications: {
          with: {
            qualification: true,
            subjects: {
              with: {
                subject: true,
                grade: true,
              },
            },
          },
        },
      },
    });
  }
}

export const applicationsRepository = new ApplicationRepository();
