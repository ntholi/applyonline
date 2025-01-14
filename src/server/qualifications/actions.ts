'use server';

import { qualifications } from '@/db/schema';
import { qualificationsService as service } from './service';

type Qualification = typeof qualifications.$inferInsert;

export async function getQualification(id: number) {
  return service.get(id);
}

export async function findAllQualifications(page: number = 1, search = '') {
  return service.findAll({ page, search });
}

export async function createQualification(value: Qualification) {
  return service.create(value);
}

export async function updateQualification(id: number, value: Qualification) {
  return service.update(id, value);
}

export async function deleteQualification(id: number) {
  return service.delete(id);
}