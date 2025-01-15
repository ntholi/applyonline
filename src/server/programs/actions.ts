'use server';


import { programs } from '@/db/schema';
import { programsService as service} from './service';

type Program = typeof programs.$inferInsert;


export async function getProgram(id: string) {
  return service.get(id);
}

export async function findAllPrograms(page: number = 1, search = '') {
  return service.findAll({ page, search });
}

export async function createProgram(program: Program) {
  return service.create(program);
}

export async function updateProgram(id: string, program: Program) {
  return service.update(id, program);
}

export async function deleteProgram(id: string) {
  return service.delete(id);
}