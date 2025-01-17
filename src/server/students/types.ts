import { studentQualifications, studentSubjects } from '@/db/schema';

export type StudentQualification = typeof studentQualifications.$inferSelect & {
  studentSubjects: (typeof studentSubjects.$inferInsert)[];
};
