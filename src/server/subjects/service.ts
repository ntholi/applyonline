import { subjects } from '@/db/schema';
import SubjectRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { FindAllParams } from '../base/BaseRepository';

type Subject = typeof subjects.$inferInsert;

class SubjectService {
  constructor(private readonly repository = new SubjectRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: number) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async findAll(params: FindAllParams<typeof subjects>) {
    return withAuth(async () => this.repository.findAll(params), []);
  }

  async create(data: Subject) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: number, data: Subject) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: number) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const subjectsService = new SubjectService();
