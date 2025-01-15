import { relations, sql } from 'drizzle-orm';
import {
  int,
  sqliteTable,
  text,
  integer,
  index,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
export const qualifications = sqliteTable(
  'qualifications',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    nameIdx: index('qualification_name_idx').on(table.name),
  })
);

export const qualificationsRelations = relations(
  qualifications,
  ({ many }) => ({
    subjects: many(subjects),
    grades: many(qualificationGrades),
  })
);

export const subjects = sqliteTable(
  'subjects',
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    code: text().notNull(),
    qualificationId: integer()
      .notNull()
      .references(() => qualifications.id, { onDelete: 'cascade' }),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    nameIdx: index('subject_name_idx').on(table.name),
  })
);

export const subjectsRelations = relations(subjects, ({ one }) => ({
  qualification: one(qualifications, {
    fields: [subjects.qualificationId],
    references: [qualifications.id],
  }),
}));

export const qualificationGrades = sqliteTable(
  'qualification_grades',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    qualificationId: integer()
      .notNull()
      .references(() => qualifications.id, { onDelete: 'cascade' }),
    index: integer().notNull(),
    name: text().notNull(),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    nameIdx: index('qualification_grade_name_idx').on(table.name),
  })
);

export const qualificationGradesRelations = relations(
  qualificationGrades,
  ({ one }) => ({
    qualification: one(qualifications, {
      fields: [qualificationGrades.qualificationId],
      references: [qualifications.id],
    }),
  })
);

export const programs = sqliteTable('programs', {
  id: text({ length: 21 })
    .$defaultFn(() => nanoid())
    .primaryKey(),
  name: text(),
  faculty: text(),
  description: text(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});

export const programsRelations = relations(programs, ({ many }) => ({
  qualifications: many(programQualifications),
}));

export const programQualifications = sqliteTable(
  'program_qualifications',
  {
    programId: text()
      .notNull()
      .references(() => programs.id, { onDelete: 'cascade' }),
    qualificationId: integer()
      .notNull()
      .references(() => qualifications.id, { onDelete: 'cascade' }),
    name: text().notNull(),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    compositePK: primaryKey({
      columns: [table.programId, table.qualificationId],
    }),
  })
);

export const programQualificationsRelations = relations(
  programQualifications,
  ({ one }) => ({
    program: one(programs, {
      fields: [programQualifications.programId],
      references: [programs.id],
    }),
    qualification: one(qualifications, {
      fields: [programQualifications.qualificationId],
      references: [qualifications.id],
    }),
  })
);
