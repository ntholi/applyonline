import { UserRole } from '@/db/schema';
import { User as DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: UserRole;
  }
}
