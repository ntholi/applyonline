'use server';


import { users } from '@/db/schema';
import { usersService as service} from './service';

type User = typeof users.$inferInsert;


export async function getUser(id: string) {
  return service.get(id);
}

export async function findAllUsers(page: number = 1, search = '') {
  return service.findAll({ page, search });
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