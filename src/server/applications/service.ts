import { applications } from '@/db/schema';
import ApplicationRepository from './repository';
import safeRun from '@/server/base/safeRun';
import { QueryOptions } from '../base/BaseRepository';

type Application = typeof applications.$inferInsert;

class ApplicationService {
  private readonly serviceName = 'ApplicationService';
  constructor(private readonly repository = new ApplicationRepository()) {}

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

  async getAll(params: QueryOptions<typeof applications>) {
    return safeRun(
      async () => this.repository.query(params),
      this.serviceName,
      'getAll',
      [],
      { params }
    );
  }

  async create(data: Application) {
    return safeRun(
      async () => this.repository.create(data),
      this.serviceName,
      'create',
      [],
      { data }
    );
  }

  async update(id: number, data: Application) {
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

export const applicationsService = new ApplicationService();
