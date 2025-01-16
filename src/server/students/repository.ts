import BaseRepository from '@/server/base/BaseRepository';
import { students } from '@/db/schema'

export default class StudentRepository extends BaseRepository<
  typeof students,
  'id'
> {
  constructor() {
    super(students, 'id');
  }
}

export const studentsRepository = new StudentRepository();