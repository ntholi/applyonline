import { students } from '@/db/schema';
import StudentRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { FindAllParams } from '../base/BaseRepository';

type Student = typeof students.$inferInsert;

class StudentService {
  constructor(private readonly repository = new StudentRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async findAll(params: FindAllParams<typeof students>) {
    return withAuth(async () => this.repository.findAll(params), []);
  }

  async create(data: Student) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: string, data: Student) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const studentsService = new StudentService();
