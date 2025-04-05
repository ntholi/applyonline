import ProgramsRepository from './repository';
import { QueryOptions } from '../base/BaseRepository';
import { BaseService } from '../base/BaseService';
import { createServiceWrapper } from '../base/ServiceWrapper';
import { programs } from '@/db/schema';

type Program = typeof programs.$inferInsert;
const resource = 'programs';

class ProgramsService extends BaseService {
  constructor(private readonly repository = new ProgramsRepository()) {
    super();
  }

  async first() {
    await this.checkAuth(['admin']);
    return this.repository.findFirst();
  }

  async get(id: string) {
    await this.checkAuth(['admin']);
    return this.repository.findById(Number(id));
  }

  async getAll(params: QueryOptions<typeof programs>) {
    await this.checkAuth(['admin']);
    return this.repository.query(params);
  }

  async create(data: Program) {
    await this.checkAuth(['admin']);
    return this.repository.create(data);
  }

  async update(id: string, data: Program) {
    await this.checkAuth(['admin']);
    return this.repository.update(Number(id), data);
  }

  async delete(id: string) {
    await this.checkAuth(['admin']);
    return this.repository.delete(Number(id));
  }

  async count() {
    await this.checkAuth(['admin']);
    return this.repository.count();
  }
}

export const programsService = createServiceWrapper(ProgramsService, resource);
