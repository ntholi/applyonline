'use server';


import { applications } from '@/db/schema';
import { applicationsService as service} from './service';

type Application = typeof applications.$inferInsert;


export async function getApplication(id: number) {
  return service.get(id);
}

export async function getApplications(page: number = 1, search = '') {
  return service.getAll({ page, search });
}

export async function createApplication(application: Application) {
  return service.create(application);
}

export async function updateApplication(id: number, application: Application) {
  return service.update(id, application);
}

export async function deleteApplication(id: number) {
  return service.delete(id);
}