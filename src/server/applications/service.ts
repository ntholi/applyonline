import { applications } from '@/db/schema';
import { QueryOptions } from '../base/BaseRepository';
import ApplicationRepository from './repository';
import { BaseService } from '../base/BaseService';
import { createServiceWrapper } from '../base/ServiceWrapper';

type Application = typeof applications.$inferInsert;
const resource = 'applications';

class ApplicationsService extends BaseService {
  constructor(private readonly repository = new ApplicationRepository()) {
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

  async getAll(params: QueryOptions<typeof applications>) {
    await this.checkAuth(['admin']);
    return this.repository.query(params);
  }

  async create(data: Application) {
    await this.checkAuth(['admin']);
    return this.repository.create(data);
  }

  async update(id: string, data: Application) {
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

export const applicationsService = createServiceWrapper(
  ApplicationsService,
  resource
);
