import { programs } from '@/db/schema';
import ProgramRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type Program = typeof programs.$inferInsert;

class ProgramService {
  constructor(private readonly repository = new ProgramRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: number) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async getAll(params: QueryOptions<typeof programs>) {
    return withAuth(async () => this.repository.query(params), []);
  }

  async create(data: Program) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: number, data: Program) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: number) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const programsService = new ProgramService();
