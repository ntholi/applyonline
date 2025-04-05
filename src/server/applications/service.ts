import { applications } from '@/db/schema';
import { QueryOptions } from '../base/BaseRepository';
import ApplicationRepository from './repository';
import { BaseService } from '../base/BaseService';
import { createServiceWrapper } from '../base/ServiceWrapper';
import withAuth from '../base/withAuth';

type Application = typeof applications.$inferInsert;
const resource = 'applications';

class ApplicationsService extends BaseService {
  constructor(private readonly repository = new ApplicationRepository()) {
    super();
  }

  async first() {
    return withAuth(async () => {
      return this.repository.findFirst();
    }, ['admin']);
  }

  async get(id: string) {
    return withAuth(async () => {
      return this.repository.findById(Number(id));
    }, ['admin']);
  }

  async getAll(params: QueryOptions<typeof applications>) {
    return withAuth(async () => {
      return this.repository.query(params);
    }, ['admin']);
  }

  async create(data: Application) {
    return withAuth(async () => {
      return this.repository.create(data);
    }, ['admin']);
  }

  async update(id: string, data: Application) {
    return withAuth(async () => {
      return this.repository.update(Number(id), data);
    }, ['admin']);
  }

  async delete(id: string) {
    return withAuth(async () => {
      return this.repository.delete(Number(id));
    }, ['admin']);
  }

  async count() {
    return withAuth(async () => {
      return this.repository.count();
    }, ['admin']);
  }
}

export const applicationsService = createServiceWrapper(
  ApplicationsService,
  resource
);
