import BaseRepository from '@/server/base/BaseRepository';
import { subjects } from '@/db/schema'

export default class SubjectRepository extends BaseRepository<
  typeof subjects,
  'id'
> {
  constructor() {
    super(subjects, 'id');
  }
}

export const subjectsRepository = new SubjectRepository();