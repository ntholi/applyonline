import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import * as relations from './schema/relations';
import * as auth from './schema/auth';

const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema: { ...schema, ...relations, ...auth },
  casing: 'snake_case',
});

export { db };
