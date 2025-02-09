import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';
import { users } from './auth';

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
  }),
);

export const qualificationsRelations = relations(
  qualifications,
  ({ many }) => ({
    subjects: many(subjects),
    grades: many(qualificationGrades),
  }),
);

export const subjects = sqliteTable(
  'subjects',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    code: text().notNull(),
    qualificationId: integer()
      .notNull()
      .references(() => qualifications.id, { onDelete: 'cascade' }),
    isCommercial: integer({ mode: 'boolean' }).notNull().default(false),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    nameIdx: index('subject_name_idx').on(table.name),
  }),
);

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
  }),
);

export const programs = sqliteTable('programs', {
  id: integer().primaryKey({ autoIncrement: true }),
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
    programId: integer()
      .notNull()
      .references(() => programs.id, { onDelete: 'cascade' }),
    qualificationId: integer()
      .notNull()
      .references(() => qualifications.id, { onDelete: 'cascade' }),
    minCredits: integer().notNull(),
    minPasses: integer().notNull(),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    compositePK: primaryKey({
      columns: [table.programId, table.qualificationId],
    }),
  }),
);

export const requiredSubjects = sqliteTable(
  'required_subjects',
  {
    programId: integer().notNull(),
    qualificationId: integer().notNull(),
    subjectId: integer()
      .notNull()
      .references(() => subjects.id, { onDelete: 'cascade' }),
    gradeId: integer()
      .notNull()
      .references(() => qualificationGrades.id, { onDelete: 'cascade' }),
    mandatory: integer({ mode: 'boolean' }).notNull().default(false),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    compositePK: primaryKey({
      columns: [table.programId, table.qualificationId, table.subjectId],
    }),
    programQualificationFK: index('program_qualification_fk').on(
      table.programId,
      table.qualificationId,
    ),
  }),
);

export const applications = sqliteTable('applications', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const nextOfKinRelationships = [
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Spouse',
  'Child',
  'Other',
] as const;

export const maritalStatuses = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
  'Other',
] as const;

export const genders = ['Male', 'Female'] as const;
export const religions = [
  'Christian',
  'Muslim',
  'Hindu',
  'Buddhist',
  'Other',
] as const;

export const studentInfo = sqliteTable(
  'student_info',
  {
    applicationId: integer()
      .primaryKey()
      .notNull()
      .references(() => applications.id, { onDelete: 'cascade' }),
    nationalId: text().notNull(),
    name: text().notNull(),
    email: text().notNull().unique(),
    phone1: text().notNull(),
    phone2: text(),
    religion: text({ enum: religions }).notNull(),
    dateOfBirth: integer({ mode: 'timestamp' }).notNull(),
    gender: text({ enum: genders }).notNull(),
    maritalStatus: text({ enum: maritalStatuses }).notNull(),
    birthPlace: text().notNull(),
    homeTown: text().notNull(),
    highSchool: text().notNull(),
    nextOfKinNames: text().notNull(),
    nextOfKinPhone: text().notNull(),
    nextOfKinRelationship: text({ enum: nextOfKinRelationships }).notNull(),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    emailIdx: index('student_email_idx').on(table.email),
    nationalIdIdx: index('student_national_id_idx').on(table.nationalId),
  }),
);

export const programChoices = sqliteTable('program_choices', {
  id: integer().primaryKey({ autoIncrement: true }),
  applicationId: integer()
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  programId: integer()
    .notNull()
    .references(() => programs.id, { onDelete: 'cascade' }),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});

export const studentQualifications = sqliteTable('student_qualifications', {
  id: integer().primaryKey({ autoIncrement: true }),
  applicationId: integer()
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  qualificationId: integer()
    .notNull()
    .references(() => qualifications.id, { onDelete: 'cascade' }),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});

export const studentSubjects = sqliteTable(
  'student_subjects',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    studentQualificationId: integer()
      .notNull()
      .references(() => studentQualifications.id, { onDelete: 'cascade' }),
    subjectId: integer()
      .notNull()
      .references(() => subjects.id, { onDelete: 'cascade' }),
    gradeId: integer()
      .notNull()
      .references(() => qualificationGrades.id, { onDelete: 'cascade' }),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    studentSubjectIdx: index('student_subject_idx').on(
      table.studentQualificationId,
      table.subjectId,
    ),
  }),
);

export const documentTypes = [
  'Certificate',
  'Statement of Results',
  'ID',
  'Passport',
  'Other',
] as const;

export const documents = sqliteTable('documents', {
  id: integer().primaryKey({ autoIncrement: true }),
  applicationId: integer()
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  fileName: text().notNull(),
  url: text().notNull(),
  type: text({ enum: documentTypes }).notNull(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});
