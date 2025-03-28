import { programs } from '@/db/schema';
import ProgramRepository from './repository';
import safeRun from '@/server/base/safeRun';
import { QueryOptions } from '../base/BaseRepository';

type Program = typeof programs.$inferInsert;

const RESOURCE = 'programs';

class ProgramService {
  constructor(private readonly repository = new ProgramRepository()) {}

  async first() {
    return safeRun(
      async () => this.repository.findFirst(),
      RESOURCE,
      'first',
      []
    );
  }

  async get(id: number) {
    return safeRun(
      async () => this.repository.findById(id),
      RESOURCE,
      'get',
      [],
      { id }
    );
  }

  async getAll(params: QueryOptions<typeof programs>) {
    return safeRun(
      async () => this.repository.query(params),
      RESOURCE,
      'getAll',
      [],
      { params }
    );
  }

  async create(data: Program) {
    return safeRun(
      async () => this.repository.create(data),
      RESOURCE,
      'create',
      [],
      { data }
    );
  }

  async update(id: number, data: Program) {
    return safeRun(
      async () => this.repository.update(id, data),
      RESOURCE,
      'update',
      [],
      { id, data }
    );
  }

  async delete(id: number) {
    return safeRun(
      async () => this.repository.delete(id),
      RESOURCE,
      'delete',
      [],
      { id }
    );
  }

  async count() {
    return safeRun(async () => this.repository.count(), RESOURCE, 'count', []);
  }
}

export const programsService = new ProgramService();
