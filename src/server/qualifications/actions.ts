'use server';

import { Qualification } from '@/app/admin/qualifications/types';
import { qualificationsService as service } from './service';

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

export async function getQualificationSubjects(qualificationId: number) {
  const qualification = await service.get(qualificationId);
  return qualification?.subjects ?? [];
}

export async function getQualificationGrades(qualificationId: number) {
  const qualification = await service.get(qualificationId);
  return qualification?.grades ?? [];
}
