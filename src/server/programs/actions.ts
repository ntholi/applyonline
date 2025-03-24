'use server';


import { programs } from '@/db/schema';
import { programsService as service} from './service';

type Program = typeof programs.$inferInsert;


export async function getProgram(id: number) {
  return service.get(id);
}

export async function getPrograms(page: number = 1, search = '') {
  return service.getAll({ page, search });
}

export async function createProgram(program: Program) {
  return service.create(program);
}

export async function updateProgram(id: number, program: Program) {
  return service.update(id, program);
}

export async function deleteProgram(id: number) {
  return service.delete(id);
}