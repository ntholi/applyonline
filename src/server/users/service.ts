import { users } from '@/db/schema/auth';
import UserRepository from './repository';
import { QueryOptions } from '../base/BaseRepository';
import safeRun from '@/server/base/safeRun';

type User = typeof users.$inferInsert;

class UserService {
  private readonly serviceName = 'UserService';
  constructor(private readonly repository = new UserRepository()) {}

  async first() {
    return safeRun(
      async () => this.repository.findFirst(),
      this.serviceName,
      'first',
      []
    );
  }

  async get(id: string) {
    return safeRun(
      async () => this.repository.findById(id),
      this.serviceName,
      'get',
      [],
      { id }
    );
  }

  async getAll(params: QueryOptions<typeof users>) {
    return safeRun(
      async () => this.repository.query(params),
      this.serviceName,
      'getAll',
      [],
      { params }
    );
  }

  async create(data: User) {
    return safeRun(
      async () => this.repository.create(data),
      this.serviceName,
      'create',
      [],
      { data }
    );
  }

  async update(id: string, data: User) {
    return safeRun(
      async () => this.repository.update(id, data),
      this.serviceName,
      'update',
      [],
      { id, data }
    );
  }

  async delete(id: string) {
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

export const usersService = new UserService();
