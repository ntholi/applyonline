import { applications } from '@/db/schema';
import ApplicationRepository from './repository';
import safeRun from '@/server/base/safeRun';
import { QueryOptions } from '../base/BaseRepository';

type Application = typeof applications.$inferInsert;
const resource = 'applications';

class ApplicationService {
  constructor(private readonly repository = new ApplicationRepository()) {}

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

  async getAll(params: QueryOptions<typeof applications>) {
    return safeRun(
      async () => this.repository.query(params),
      resource,
      'getAll',
      [],
      { params }
    );
  }

  async create(data: Application) {
    return safeRun(
      async () => this.repository.create(data),
      resource,
      'create',
      [],
      { data }
    );
  }

  async update(id: number, data: Application) {
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

export const applicationsService = new ApplicationService();
