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
  studentDetails,
  studentQualifications,
  studentSubjects,
  subjects,
} from './';
import { users } from './auth';

export const usersRelations = relations(users, ({ many, one }) => ({
  applications: many(applications, { relationName: 'applications' }),
  studentDetails: one(studentDetails),
  reviewedApplications: many(applications, { relationName: 'reviewer' }),
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
  firstChoices: many(programChoices, { relationName: 'firstChoice' }),
  secondChoices: many(programChoices, { relationName: 'secondChoice' }),
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
    applicant: one(users, {
      fields: [applications.userId],
      references: [users.id],
      relationName: 'applicant',
    }),
    reviewer: one(users, {
      fields: [applications.reviewerId],
      references: [users.id],
      relationName: 'reviewer',
    }),
    studentDetails: one(studentDetails, {
      fields: [applications.userId],
      references: [studentDetails.userId],
    }),
    programChoice: one(programChoices),
    studentQualifications: many(studentQualifications),
    documents: many(documents),
  }),
);

export const studentDetailsRelations = relations(studentDetails, ({ one }) => ({
  user: one(users, {
    fields: [studentDetails.userId],
    references: [users.id],
  }),
  application: one(applications, {
    fields: [studentDetails.userId],
    references: [applications.userId],
  }),
}));

export const programChoicesRelations = relations(programChoices, ({ one }) => ({
  application: one(applications),
  firstChoice: one(programs, {
    fields: [programChoices.firstProgramId],
    references: [programs.id],
  }),
  secondChoice: one(programs, {
    fields: [programChoices.secondProgramId],
    references: [programs.id],
  }),
}));

export const studentQualificationsRelations = relations(
  studentQualifications,
  ({ one, many }) => ({
    application: one(applications),
    qualification: one(qualifications),
    subjects: many(studentSubjects),
  }),
);

export const studentSubjectsRelations = relations(
  studentSubjects,
  ({ one }) => ({
    studentQualification: one(studentQualifications),
    subject: one(subjects),
    grade: one(qualificationGrades),
  }),
);

export const documentsRelations = relations(documents, ({ one }) => ({
  application: one(applications),
}));
