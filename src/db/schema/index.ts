import { sql } from 'drizzle-orm';
import { int, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const subjects = sqliteTable('subjects', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const qualifications = sqliteTable('qualifications', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});
