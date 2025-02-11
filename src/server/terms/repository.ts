import BaseRepository from '@/server/base/BaseRepository';
import { terms } from '@/db/schema'

export default class TermRepository extends BaseRepository<
  typeof terms,
  'id'
> {
  constructor() {
    super(terms, 'id');
  }
}

export const termsRepository = new TermRepository();