import { users } from '@/db/schema/auth';
import UserRepository from './repository';
import { QueryOptions } from '../base/BaseRepository';
import safeRun from '@/server/base/safeRun';

type User = typeof users.$inferInsert;
const resourceName = 'users';

class UserService {
  constructor(private readonly repository = new UserRepository()) {}

  async first() {
    return safeRun(
      async () => this.repository.findFirst(),
      resourceName,
      'first',
      []
    );
  }

  async get(id: string) {
    return safeRun(
      async () => this.repository.findById(id),
      resourceName,
      'get',
      [],
      { id }
    );
  }

  async getAll(params: QueryOptions<typeof users>) {
    return safeRun(
      async () => this.repository.query(params),
      resourceName,
      'getAll',
      [],
      { params }
    );
  }

  async create(data: User) {
    return safeRun(
      async () => this.repository.create(data),
      resourceName,
      'create',
      [],
      { data }
    );
  }

  async update(id: string, data: User) {
    return safeRun(
      async () => this.repository.update(id, data),
      resourceName,
      'update',
      [],
      { id, data }
    );
  }

  async delete(id: string) {
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

export const usersService = new UserService();
