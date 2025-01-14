import BaseRepository from '@/server/base/BaseRepository';
import { qualifications } from '@/db/schema'

export default class QualificationRepository extends BaseRepository<
  typeof qualifications,
  'id'
> {
  constructor() {
    super(qualifications, 'id');
  }
}

export const qualificationsRepository = new QualificationRepository();