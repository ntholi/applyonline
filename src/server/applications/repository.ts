import BaseRepository from '@/server/base/BaseRepository';
import { applications } from '@/db/schema'

export default class ApplicationRepository extends BaseRepository<
  typeof applications,
  'id'
> {
  constructor() {
    super(applications, 'id');
  }
}

export const applicationsRepository = new ApplicationRepository();