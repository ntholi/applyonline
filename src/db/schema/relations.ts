import { relations } from 'drizzle-orm';
import {
  applications,
  documents,
  programChoices,
  programQualifications,
  programs,
  qualificationGrades,
  qualifications,
  requiredSubjects,
  studentInfo,
  studentQualifications,
  studentSubjects,
  subjects,
} from './';
import { users } from './auth';

export const usersRelations = relations(users, ({ many }) => ({
  applications: many(applications),
}));

export const qualificationsRelations = relations(
  qualifications,
  ({ many }) => ({
    subjects: many(subjects),
    grades: many(qualificationGrades),
    programQualifications: many(programQualifications),
    studentQualifications: many(studentQualifications),
  }),
);

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  qualification: one(qualifications, {
    fields: [subjects.qualificationId],
    references: [qualifications.id],
  }),
  requiredSubjects: many(requiredSubjects),
  studentSubjects: many(studentSubjects),
}));

export const qualificationGradesRelations = relations(
  qualificationGrades,
  ({ one, many }) => ({
    qualification: one(qualifications, {
      fields: [qualificationGrades.qualificationId],
      references: [qualifications.id],
    }),
    requiredSubjects: many(requiredSubjects),
    studentSubjects: many(studentSubjects),
  }),
);

export const programsRelations = relations(programs, ({ many }) => ({
  programQualifications: many(programQualifications),
  programChoices: many(programChoices),
}));

export const programQualificationsRelations = relations(
  programQualifications,
  ({ one, many }) => ({
    program: one(programs, {
      fields: [programQualifications.programId],
      references: [programs.id],
    }),
    qualification: one(qualifications, {
      fields: [programQualifications.qualificationId],
      references: [qualifications.id],
    }),
    requiredSubjects: many(requiredSubjects),
  }),
);

export const requiredSubjectsRelations = relations(
  requiredSubjects,
  ({ one }) => ({
    programQualification: one(programQualifications, {
      fields: [requiredSubjects.programId, requiredSubjects.qualificationId],
      references: [
        programQualifications.programId,
        programQualifications.qualificationId,
      ],
    }),
    subject: one(subjects, {
      fields: [requiredSubjects.subjectId],
      references: [subjects.id],
    }),
    grade: one(qualificationGrades, {
      fields: [requiredSubjects.gradeId],
      references: [qualificationGrades.id],
    }),
  }),
);

export const applicationsRelations = relations(
  applications,
  ({ one, many }) => ({
    user: one(users, {
      fields: [applications.userId],
      references: [users.id],
    }),
    studentInfo: one(studentInfo),
    programChoices: many(programChoices),
    studentQualifications: many(studentQualifications),
    documents: many(documents),
  }),
);

export const studentInfoRelations = relations(studentInfo, ({ one }) => ({
  application: one(applications, {
    fields: [studentInfo.applicationId],
    references: [applications.id],
  }),
}));

export const programChoicesRelations = relations(programChoices, ({ one }) => ({
  application: one(applications, {
    fields: [programChoices.applicationId],
    references: [applications.id],
  }),
  program: one(programs, {
    fields: [programChoices.programId],
    references: [programs.id],
  }),
}));

export const studentQualificationsRelations = relations(
  studentQualifications,
  ({ one, many }) => ({
    application: one(applications, {
      fields: [studentQualifications.applicationId],
      references: [applications.id],
    }),
    qualification: one(qualifications, {
      fields: [studentQualifications.qualificationId],
      references: [qualifications.id],
    }),
    subjects: many(studentSubjects),
  }),
);

export const studentSubjectsRelations = relations(
  studentSubjects,
  ({ one }) => ({
    studentQualification: one(studentQualifications, {
      fields: [studentSubjects.studentQualificationId],
      references: [studentQualifications.id],
    }),
    subject: one(subjects, {
      fields: [studentSubjects.subjectId],
      references: [subjects.id],
    }),
    grade: one(qualificationGrades, {
      fields: [studentSubjects.gradeId],
      references: [qualificationGrades.id],
    }),
  }),
);

export const documentsRelations = relations(documents, ({ one }) => ({
  application: one(applications, {
    fields: [documents.applicationId],
    references: [applications.id],
  }),
}));
