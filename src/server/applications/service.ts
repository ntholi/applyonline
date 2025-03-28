import { applications } from '@/db/schema';
import ApplicationRepository from './repository';
import safeRun from '@/server/base/safeRun';
import { QueryOptions } from '../base/BaseRepository';

type Application = typeof applications.$inferInsert;
const resourceName = 'applications';

class ApplicationService {
  constructor(private readonly repository = new ApplicationRepository()) {}

  async first() {
    return safeRun(
      async () => this.repository.findFirst(),
      resourceName,
      'first',
      []
    );
  }

  async get(id: number) {
    return safeRun(
      async () => this.repository.findById(id),
      resourceName,
      'get',
      [],
      { id }
    );
  }

  async getAll(params: QueryOptions<typeof applications>) {
    return safeRun(
      async () => this.repository.query(params),
      resourceName,
      'getAll',
      [],
      { params }
    );
  }

  async create(data: Application) {
    return safeRun(
      async () => this.repository.create(data),
      resourceName,
      'create',
      [],
      { data }
    );
  }

  async update(id: number, data: Application) {
    return safeRun(
      async () => this.repository.update(id, data),
      resourceName,
      'update',
      [],
      { id, data }
    );
  }

  async delete(id: number) {
    return safeRun(
      async () => this.repository.delete(id),
      resourceName,
      'delete',
      [],
      { id }
    );
  }

  async count() {
    return safeRun(
      async () => this.repository.count(),
      resourceName,
      'count',
      []
    );
  }
}

export const applicationsService = new ApplicationService();
