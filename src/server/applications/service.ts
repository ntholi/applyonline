import { applications } from '@/db/schema';
import { QueryOptions } from '../base/BaseRepository';
import ApplicationRepository from './repository';
import { createServiceWrapper } from '../base/ServiceWrapper';
import withAuth from '../base/withAuth';

type Application = typeof applications.$inferInsert;
const resource = 'applications';

class ApplicationsService {
  constructor(private readonly repository = new ApplicationRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), ['admin']);
  }

  async get(id: number) {
    return withAuth(async () => this.repository.findById(id), ['admin']);
  }

  async getAll(params: QueryOptions<typeof applications>) {
    return withAuth(async () => this.repository.query(params), ['admin']);
  }

  async create(data: Application) {
    return withAuth(async () => this.repository.create(data), ['admin']);
  }

  async update(id: number, data: Application) {
    return withAuth(async () => this.repository.update(id, data), ['admin']);
  }

  async delete(id: number) {
    return withAuth(async () => this.repository.delete(id), ['admin']);
  }

  async count() {
    return withAuth(async () => this.repository.count(), ['admin']);
  }
}

export const applicationsService = createServiceWrapper(
  ApplicationsService,
  resource
);
