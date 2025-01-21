import { documents } from '@/db/schema';
import DocumentRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { FindAllParams } from '../base/BaseRepository';

type Document = typeof documents.$inferInsert;

class DocumentService {
  constructor(private readonly repository = new DocumentRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: number) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async findAll(params: FindAllParams<typeof documents>) {
    return withAuth(async () => this.repository.findAll(params), []);
  }

  async create(data: Document) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: number, data: Document) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: number) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const documentsService = new DocumentService();
