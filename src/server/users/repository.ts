import BaseRepository from '@/server/base/BaseRepository';
import { users } from '@/db/schema/auth';

export default class UserRepository extends BaseRepository<typeof users, 'id'> {
  constructor() {
    super(users, 'id');
  }
}

export const usersRepository = new UserRepository();
