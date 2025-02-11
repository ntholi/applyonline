'use server';


import { terms } from '@/db/schema';
import { termsService as service} from './service';

type Term = typeof terms.$inferInsert;


export async function getTerm(id: number) {
  return service.get(id);
}

export async function findAllTerms(page: number = 1, search = '') {
  return service.findAll({ page, search });
}

export async function createTerm(term: Term) {
  return service.create(term);
}

export async function updateTerm(id: number, term: Term) {
  return service.update(id, term);
}

export async function deleteTerm(id: number) {
  return service.delete(id);
}