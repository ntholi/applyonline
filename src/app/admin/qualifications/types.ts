import { qualificationGrades, qualifications, subjects } from '@/db/schema';

export type QualificationGrade = typeof qualificationGrades.$inferSelect;

export type Qualification = typeof qualifications.$inferSelect & {
  subjects: (typeof subjects.$inferSelect)[];
  grades: QualificationGrade[];
};
