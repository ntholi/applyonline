import { studentDetails } from '@/db/schema';
import withAuth from '@/server/base/withAuth';
import { FindAllParams } from '../base/BaseRepository';
import StudentRepository from './repository';
import { StudentQualification } from './types';

type Student = typeof studentDetails.$inferInsert;

class StudentService {
  constructor(private readonly repository = new StudentRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), ['user']);
  }

  async findAll(params: FindAllParams<typeof studentDetails>) {
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

  async saveQualification(value: StudentQualification) {
    return withAuth(async () => this.repository.saveQualification(value), []);
  }
}

export const studentsService = new StudentService();
