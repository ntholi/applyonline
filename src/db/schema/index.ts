import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  unique,
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
    createdAtIdx: index('qualification_created_at_idx').on(table.createdAt),
  })
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
    codeIdx: index('subject_code_idx').on(table.code),
    qualificationIdIdx: index('subject_qualification_id_idx').on(
      table.qualificationId
    ),
    commercialIdx: index('subject_commercial_idx').on(table.isCommercial),
  })
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
    qualificationIdIdx: index('qualification_grade_qual_id_idx').on(
      table.qualificationId
    ),
    indexIdx: index('qualification_grade_index_idx').on(table.index),
  })
);

export const programs = sqliteTable(
  'programs',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    code: text().notNull(),
    faculty: text(),
    description: text(),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    nameIdx: index('program_name_idx').on(table.name),
    facultyIdx: index('program_faculty_idx').on(table.faculty),
  })
);

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
    programIdIdx: index('program_qualification_program_id_idx').on(
      table.programId
    ),
    qualificationIdIdx: index('program_qualification_qual_id_idx').on(
      table.qualificationId
    ),
  })
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
      table.qualificationId
    ),
    subjectIdIdx: index('required_subject_subject_id_idx').on(table.subjectId),
    gradeIdIdx: index('required_subject_grade_id_idx').on(table.gradeId),
  })
);

export const applicationStatus = ['pending', 'approved', 'rejected'] as const;

export const applications = sqliteTable(
  'applications',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    status: text({ enum: applicationStatus }).notNull().default('pending'),
    submissionDate: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    reviewDate: integer({ mode: 'timestamp' }),
    reviewerId: text().references(() => users.id),
    currentStep: integer().notNull(),
    termId: integer()
      .notNull()
      .references(() => terms.id),
  },
  (table) => ({
    userIdIdx: index('application_user_id_idx').on(table.userId),
    statusIdx: index('application_status_idx').on(table.status),
    submissionDateIdx: index('application_submission_date_idx').on(
      table.submissionDate
    ),
    uniqueUserIdTermId: unique().on(table.userId, table.termId),
  })
);

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

export const studentDetails = sqliteTable(
  'student_details',
  {
    userId: text()
      .primaryKey()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
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
    nameIdx: index('student_name_idx').on(table.name),
    dateOfBirthIdx: index('student_dob_idx').on(table.dateOfBirth),
    highSchoolIdx: index('student_high_school_idx').on(table.highSchool),
    createdAtIdx: index('student_created_at_idx').on(table.createdAt),
  })
);

export const programChoices = sqliteTable(
  'program_choices',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    applicationId: integer()
      .notNull()
      .references(() => applications.id, { onDelete: 'cascade' }),
    firstProgramId: integer()
      .notNull()
      .references(() => programs.id, { onDelete: 'cascade' }),
    secondProgramId: integer().references(() => programs.id, {
      onDelete: 'cascade',
    }),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    applicationIdIdx: index('program_choice_application_id_idx').on(
      table.applicationId
    ),
    firstChoiceIdx: index('program_choice_first_choice_idx').on(
      table.firstProgramId
    ),
    secondChoiceIdx: index('program_choice_second_choice_idx').on(
      table.secondProgramId
    ),
  })
);

export const studentQualifications = sqliteTable(
  'student_qualifications',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    applicationId: integer()
      .notNull()
      .references(() => applications.id, { onDelete: 'cascade' }),
    qualificationId: integer()
      .notNull()
      .references(() => qualifications.id, { onDelete: 'cascade' }),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    applicationIdIdx: index('student_qual_application_id_idx').on(
      table.applicationId
    ),
    qualificationIdIdx: index('student_qual_qualification_id_idx').on(
      table.qualificationId
    ),
  })
);

export const studentSubjects = sqliteTable(
  'student_subjects',
  {
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
      table.subjectId
    ),
    gradeIdIdx: index('student_subject_grade_id_idx').on(table.gradeId),
    uniqueSubject: primaryKey({
      columns: [table.studentQualificationId, table.subjectId],
    }),
  })
);

export const documentTypes = [
  'Certificate',
  'Statement of Results',
  'ID',
  'Passport',
  'Other',
] as const;

export const documents = sqliteTable(
  'documents',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    applicationId: integer()
      .notNull()
      .references(() => applications.id, { onDelete: 'cascade' }),
    fileName: text().notNull(),
    url: text().notNull(),
    type: text({ enum: documentTypes }).notNull(),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    applicationIdIdx: index('document_application_id_idx').on(
      table.applicationId
    ),
    typeIdx: index('document_type_idx').on(table.type),
  })
);

export const terms = sqliteTable('terms', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text(),
  isActive: integer({ mode: 'boolean' }).default(false),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});
