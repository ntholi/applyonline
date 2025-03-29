import { programs } from '@/db/schema';
import ProgramRepository from './repository';
import safeRun from '@/server/base/safeRun';
import { QueryOptions } from '../base/BaseRepository';

type Program = typeof programs.$inferInsert;

const resource = 'programs';

class ProgramService {
  constructor(private readonly repository = new ProgramRepository()) {}

  async first() {
    return safeRun(this.repository.findFirst, resource, 'first', []);
  }

  async get(id: number) {
    return safeRun(
      async () => this.repository.findById(id),
      resource,
      'get',
      [],
      { id }
    );
  }

  async getAll(params: QueryOptions<typeof programs>) {
    return safeRun(
      async () => this.repository.query(params),
      resource,
      'getAll',
      [],
      { params }
    );
  }

  async create(data: Program) {
    return safeRun(
      async () => this.repository.create(data),
      resource,
      'create',
      [],
      { data }
    );
  }

  async update(id: number, data: Program) {
    return safeRun(
      async () => this.repository.update(id, data),
      resource,
      'update',
      [],
      { id, data }
    );
  }

  async delete(id: number) {
    return safeRun(
      async () => this.repository.delete(id),
      resource,
      'delete',
      [],
      { id }
    );
  }

  async count() {
    return safeRun(this.repository.count, resource, 'count', []);
  }
}

export const programsService = new ProgramService();
