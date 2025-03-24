import { applications } from '@/db/schema';
import ApplicationRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type Application = typeof applications.$inferInsert;

class ApplicationService {
  constructor(private readonly repository = new ApplicationRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: number) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async getAll(params: QueryOptions<typeof applications>) {
    return withAuth(async () => this.repository.query(params), []);
  }

  async create(data: Application) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: number, data: Application) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: number) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const applicationsService = new ApplicationService();
