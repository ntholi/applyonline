'use server';


import { subjects } from '@/db/schema';
import { subjectsService as service} from './service';

type Subject = typeof subjects.$inferInsert;


export async function getSubject(id: number) {
  return service.get(id);
}

export async function findAllSubjects(page: number = 1, search = '') {
  return service.findAll({ page, search });
}

export async function createSubject(subject: Subject) {
  return service.create(subject);
}

export async function updateSubject(id: number, subject: Subject) {
  return service.update(id, subject);
}

export async function deleteSubject(id: number) {
  return service.delete(id);
}