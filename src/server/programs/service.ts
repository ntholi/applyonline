import ProgramsRepository from './repository';
import { QueryOptions } from '../base/BaseRepository';
import { BaseService } from '../base/BaseService';
import { createServiceWrapper } from '../base/ServiceWrapper';
import { programs } from '@/db/schema';
import withAuth from '../base/withAuth';

type Program = typeof programs.$inferInsert;
const resource = 'programs';

class ProgramsService extends BaseService {
  constructor(private readonly repository = new ProgramsRepository()) {
    super();
  }

  async first() {
    return withAuth(async () => this.repository.findFirst(), ['admin']);
  }

  async get(id: string) {
    return withAuth(
      async () => this.repository.findById(Number(id)),
      ['admin']
    );
  }

  async getAll(params: QueryOptions<typeof programs>) {
    return withAuth(async () => this.repository.query(params), ['admin']);
  }

  async create(data: Program) {
    return withAuth(async () => this.repository.create(data), ['admin']);
  }

  async update(id: string, data: Program) {
    return withAuth(
      async () => this.repository.update(Number(id), data),
      ['admin']
    );
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(Number(id)), ['admin']);
  }

  async count() {
    return withAuth(async () => this.repository.count(), ['admin']);
  }
}

export const programsService = createServiceWrapper(ProgramsService, resource);
