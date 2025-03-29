import { users } from '@/db/schema/auth';
import UserRepository from './repository';
import { QueryOptions } from '../base/BaseRepository';
import safeRun from '@/server/base/safeRun';

type User = typeof users.$inferInsert;
const resource = 'users';

class UserService {
  constructor(private readonly repository = new UserRepository()) {}

  async first() {
    return safeRun(this.repository.findFirst, resource, 'first', []);
  }

  async get(id: string) {
    return safeRun(
      async () => this.repository.findById(id),
      resource,
      'get',
      [],
      { id }
    );
  }

  async getAll(params: QueryOptions<typeof users>) {
    return safeRun(
      async () => this.repository.query(params),
      resource,
      'getAll',
      [],
      { params }
    );
  }

  async create(data: User) {
    return safeRun(
      async () => this.repository.create(data),
      resource,
      'create',
      [],
      { data }
    );
  }

  async update(id: string, data: User) {
    return safeRun(
      async () => this.repository.update(id, data),
      resource,
      'update',
      [],
      { id, data }
    );
  }

  async delete(id: string) {
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

export const usersService = new UserService();
