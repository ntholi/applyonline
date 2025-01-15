import { programs } from '@/db/schema';
import ProgramRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { FindAllParams } from '../base/BaseRepository';
import { Program } from '@/app/admin/programs/types';

class ProgramService {
  constructor(private readonly repository = new ProgramRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async findAll(params: FindAllParams<typeof programs>) {
    return withAuth(async () => this.repository.findAll(params), []);
  }

  async create(data: Program) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: string, data: Program) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const programsService = new ProgramService();
