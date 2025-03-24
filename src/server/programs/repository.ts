import BaseRepository from '@/server/base/BaseRepository';
import { programs } from '@/db/schema'

export default class ProgramRepository extends BaseRepository<
  typeof programs,
  'id'
> {
  constructor() {
    super(programs, 'id');
  }
}

export const programsRepository = new ProgramRepository();