import { studentQualifications, studentSubjects } from '@/db/schema';

export type StudentQualification = typeof studentQualifications.$inferInsert & {
  studentSubjects: (typeof studentSubjects.$inferInsert)[];
};
