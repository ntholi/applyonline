import ProgramsRepository from './repository';
import { QueryOptions } from '../base/BaseRepository';
import { createServiceWrapper } from '../base/ServiceWrapper';
import { programs } from '@/db/schema';
import withAuth from '../base/withAuth';

type Program = typeof programs.$inferInsert;
const resource = 'programs';

class ProgramsService {
  constructor(private readonly repository = new ProgramsRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), ['admin']);
  }

  async get(id: number) {
    return withAuth(async () => this.repository.findById(id), ['admin']);
  }

  async getAll(params: QueryOptions<typeof programs>) {
    return withAuth(async () => this.repository.query(params), ['admin']);
  }

  async create(data: Program) {
    return withAuth(async () => this.repository.create(data), ['admin']);
  }

  async update(id: number, data: Program) {
    return withAuth(async () => this.repository.update(id, data), ['admin']);
  }

  async delete(id: number) {
    return withAuth(async () => this.repository.delete(id), ['admin']);
  }

  async count() {
    return withAuth(async () => this.repository.count(), ['admin']);
  }
}

export const programsService = createServiceWrapper(ProgramsService, resource);
