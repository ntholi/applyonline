import { users } from '@/db/schema/auth';
import UserRepository from './repository';
import { QueryOptions } from '../base/BaseRepository';
import { BaseService } from '../base/BaseService';
import { createServiceWrapper } from '../base/ServiceWrapper';

type User = typeof users.$inferInsert;
const resource = 'users';

class UserService extends BaseService {
  constructor(private readonly repository = new UserRepository()) {
    super();
  }

  async first() {
    await this.checkAuth(['admin']);
    return this.repository.findFirst();
  }

  async get(id: string) {
    await this.checkAuth(['admin']);
    return this.repository.findById(id);
  }

  async getAll(params: QueryOptions<typeof users>) {
    await this.checkAuth(['admin']);
    return this.repository.query(params);
  }

  async create(data: User) {
    await this.checkAuth(['admin']);
    return this.repository.create(data);
  }

  async update(id: string, data: User) {
    await this.checkAuth(['admin']);
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.checkAuth(['admin']);
    return this.repository.delete(id);
  }

  async count() {
    await this.checkAuth(['admin']);
    return this.repository.count();
  }
}

export const usersService = createServiceWrapper(UserService, resource);
