import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const subjects = sqliteTable('subjects', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});
