import { relations } from 'drizzle-orm';
import { users } from './auth';
import {
  applications,
  documents,
  programQualifications,
  programs,
  qualificationGrades,
  qualifications,
  studentInfo,
  studentQualifications,
  studentSubjects,
  subjects,
} from './index';

export const usersRelations = relations(users, ({ many, one }) => ({
  studentInfo: one(studentInfo, {
    fields: [users.id],
    references: [studentInfo.userId],
  }),
  applications: many(applications),
  studentQualifications: many(studentQualifications),
  documents: many(documents),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
  firstChoice: one(programs, {
    fields: [applications.firstChoiceId],
    references: [programs.id],
  }),
  secondChoice: one(programs, {
    fields: [applications.secondChoiceId],
    references: [programs.id],
  }),
}));

export const studentQualificationsRelations = relations(
  studentQualifications,
  ({ one, many }) => ({
    user: one(users, {
      fields: [studentQualifications.userId],
      references: [users.id],
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
  }),
);

export const subjectsRelations = relations(subjects, ({ one }) => ({
  qualification: one(qualifications, {
    fields: [subjects.qualificationId],
    references: [qualifications.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
}));
