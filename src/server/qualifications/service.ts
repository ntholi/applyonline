import { qualifications } from '@/db/schema';
import QualificationRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { FindAllParams } from '../base/BaseRepository';
import { Qualification } from '@/app/admin/qualifications/types';

class QualificationService {
  constructor(private readonly repository = new QualificationRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: number) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async findByStudentId(studentId: number) {
    return withAuth(async () => this.repository.findByStudentId(studentId), []);
  }

  async findAll(params: FindAllParams<typeof qualifications>) {
    return withAuth(async () => this.repository.findAll(params), []);
  }

  async create(data: Qualification) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: number, data: Qualification) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: number) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const qualificationsService = new QualificationService();
