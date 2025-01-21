'use server';


import { documents } from '@/db/schema';
import { documentsService as service} from './service';

type Document = typeof documents.$inferInsert;


export async function getDocument(id: number) {
  return service.get(id);
}

export async function findAllDocuments(page: number = 1, search = '') {
  return service.findAll({ page, search });
}

export async function createDocument(document: Document) {
  return service.create(document);
}

export async function updateDocument(id: number, document: Document) {
  return service.update(id, document);
}

export async function deleteDocument(id: number) {
  return service.delete(id);
}