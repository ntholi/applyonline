import { users } from '@/db/schema/auth';
import { QueryOptions } from '../base/BaseRepository';
import { BaseService } from '../base/BaseService';
import { createServiceWrapper } from '../base/ServiceWrapper';
import UsersRepository from './repository';
import withAuth from '../base/withAuth';

type User = typeof users.$inferInsert;
const resource = 'users';

class UsersService extends BaseService {
  constructor(private readonly repository = new UsersRepository()) {
    super();
  }

  async first() {
    return withAuth(async () => this.repository.findFirst(), ['admin']);
  }

  async get(id: string) {
    return withAuth(async () => {
      return this.repository.findById(id);
    }, ['admin']);
  }

  async getAll(params: QueryOptions<typeof users>) {
    return withAuth(async () => {
      return this.repository.query(params);
    }, ['admin']);
  }

  async create(data: User) {
    return withAuth(async () => {
      return this.repository.create(data);
    }, ['admin']);
  }

  async update(id: string, data: User) {
    return withAuth(async () => {
      return this.repository.update(id, data);
    }, ['admin']);
  }

  async delete(id: string) {
    return withAuth(async () => {
      return this.repository.delete(id);
    }, ['admin']);
  }

  async count() {
    return withAuth(async () => {
      return this.repository.count();
    }, ['admin']);
  }
}

export const usersService = createServiceWrapper(UsersService, resource);
