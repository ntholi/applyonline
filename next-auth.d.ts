import { users } from '@/db/schema/auth';
import { User as DefaultUser } from 'next-auth';

type Role = (typeof users.$inferSelect)['role'];
declare module 'next-auth' {
  interface User extends DefaultUser {
    role: Role;
    studentId: string | null;
  }
}
