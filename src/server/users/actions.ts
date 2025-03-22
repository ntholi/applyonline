'use server';

import { users } from '@/db/schema/auth';
import { usersService as service } from './service';
import { eq } from 'drizzle-orm';

type User = typeof users.$inferInsert;

export async function getUser(id: string) {
  return service.get(id);
}

export async function findAllUsers(page: number = 1, search = '') {
  return service.findAll({ page, search });
}

export async function findAllAdmins() {
  return service.findAll({
    where: eq(users.role, 'admin'),
  });
}

export async function createUser(user: User) {
  return service.create(user);
}

export async function updateUser(id: string, user: User) {
  return service.update(id, user);
}

export async function deleteUser(id: string) {
  return service.delete(id);
}
