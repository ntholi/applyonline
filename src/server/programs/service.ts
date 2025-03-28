import { programs } from '@/db/schema';
import ProgramRepository from './repository';
import safeRun from '@/server/base/safeRun';
import { QueryOptions } from '../base/BaseRepository';

type Program = typeof programs.$inferInsert;

class ProgramService {
  private readonly serviceName = 'ProgramService';
  constructor(private readonly repository = new ProgramRepository()) {}

  async first() {
    return safeRun(
      async () => this.repository.findFirst(),
      this.serviceName,
      'first',
      []
    );
  }

  async get(id: number) {
    return safeRun(
      async () => this.repository.findById(id),
      this.serviceName,
      'get',
      [],
      { id }
    );
  }

  async getAll(params: QueryOptions<typeof programs>) {
    return safeRun(
      async () => this.repository.query(params),
      this.serviceName,
      'getAll',
      [],
      { params }
    );
  }

  async create(data: Program) {
    return safeRun(
      async () => this.repository.create(data),
      this.serviceName,
      'create',
      [],
      { data }
    );
  }

  async update(id: number, data: Program) {
    return safeRun(
      async () => this.repository.update(id, data),
      this.serviceName,
      'update',
      [],
      { id, data }
    );
  }

  async delete(id: number) {
    return safeRun(
      async () => this.repository.delete(id),
      this.serviceName,
      'delete',
      [],
      { id }
    );
  }

  async count() {
    return safeRun(
      async () => this.repository.count(),
      this.serviceName,
      'count',
      []
    );
  }
}

export const programsService = new ProgramService();
