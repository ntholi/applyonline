import { programQualifications, programs, requiredSubjects } from '@/db/schema';

export type ProgramQualification = typeof programQualifications.$inferInsert & {
  subjects: (typeof requiredSubjects.$inferSelect)[];
};

export type Program = typeof programs.$inferInsert & {
  programQualifications: ProgramQualification[];
};
