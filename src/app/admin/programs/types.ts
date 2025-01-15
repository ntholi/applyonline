import {
  programQualifications,
  programs,
  qualificationSubjects,
} from '@/db/schema';

export type ProgramQualification = typeof programQualifications.$inferInsert & {
  subjects: (typeof qualificationSubjects.$inferSelect)[];
};

export type Program = typeof programs.$inferInsert & {
  programQualifications: ProgramQualification[];
};
