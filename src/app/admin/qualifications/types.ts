import { qualifications, subjects } from '@/db/schema';

export type Qualification = typeof qualifications.$inferSelect & {
  subjects: (typeof subjects.$inferSelect)[];
};
