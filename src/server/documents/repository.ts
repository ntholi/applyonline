import BaseRepository from '@/server/base/BaseRepository';
import { documents } from '@/db/schema'

export default class DocumentRepository extends BaseRepository<
  typeof documents,
  'id'
> {
  constructor() {
    super(documents, 'id');
  }
}

export const documentsRepository = new DocumentRepository();