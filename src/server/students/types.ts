import { studentQualifications } from '@/db/schema';

export type StudentQualification = typeof studentQualifications.$inferInsert & {
  studentSubjects: { subjectId: number; gradeId: number }[];
};
