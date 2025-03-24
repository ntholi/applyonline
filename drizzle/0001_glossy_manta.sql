DROP INDEX "application_user_id_idx";--> statement-breakpoint
DROP INDEX "application_status_idx";--> statement-breakpoint
DROP INDEX "application_submission_date_idx";--> statement-breakpoint
DROP INDEX "applications_userId_termId_unique";--> statement-breakpoint
DROP INDEX "document_application_id_idx";--> statement-breakpoint
DROP INDEX "document_type_idx";--> statement-breakpoint
DROP INDEX "program_choice_application_id_idx";--> statement-breakpoint
DROP INDEX "program_choice_first_choice_idx";--> statement-breakpoint
DROP INDEX "program_choice_second_choice_idx";--> statement-breakpoint
DROP INDEX "program_qualification_program_id_idx";--> statement-breakpoint
DROP INDEX "program_qualification_qual_id_idx";--> statement-breakpoint
DROP INDEX "program_name_idx";--> statement-breakpoint
DROP INDEX "program_faculty_idx";--> statement-breakpoint
DROP INDEX "qualification_grade_name_idx";--> statement-breakpoint
DROP INDEX "qualification_grade_qual_id_idx";--> statement-breakpoint
DROP INDEX "qualification_grade_index_idx";--> statement-breakpoint
DROP INDEX "qualification_name_idx";--> statement-breakpoint
DROP INDEX "qualification_created_at_idx";--> statement-breakpoint
DROP INDEX "program_qualification_fk";--> statement-breakpoint
DROP INDEX "required_subject_subject_id_idx";--> statement-breakpoint
DROP INDEX "required_subject_grade_id_idx";--> statement-breakpoint
DROP INDEX "student_details_email_unique";--> statement-breakpoint
DROP INDEX "student_email_idx";--> statement-breakpoint
DROP INDEX "student_national_id_idx";--> statement-breakpoint
DROP INDEX "student_name_idx";--> statement-breakpoint
DROP INDEX "student_dob_idx";--> statement-breakpoint
DROP INDEX "student_high_school_idx";--> statement-breakpoint
DROP INDEX "student_created_at_idx";--> statement-breakpoint
DROP INDEX "student_qual_application_id_idx";--> statement-breakpoint
DROP INDEX "student_qual_qualification_id_idx";--> statement-breakpoint
DROP INDEX "student_subject_idx";--> statement-breakpoint
DROP INDEX "student_subject_grade_id_idx";--> statement-breakpoint
DROP INDEX "subject_name_idx";--> statement-breakpoint
DROP INDEX "subject_code_idx";--> statement-breakpoint
DROP INDEX "subject_qualification_id_idx";--> statement-breakpoint
DROP INDEX "subject_commercial_idx";--> statement-breakpoint
DROP INDEX "authenticators_credentialID_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `programs` ALTER COLUMN "name" TO "name" text NOT NULL;--> statement-breakpoint
CREATE INDEX `application_user_id_idx` ON `applications` (`user_id`);--> statement-breakpoint
CREATE INDEX `application_status_idx` ON `applications` (`status`);--> statement-breakpoint
CREATE INDEX `application_submission_date_idx` ON `applications` (`submission_date`);--> statement-breakpoint
CREATE UNIQUE INDEX `applications_userId_termId_unique` ON `applications` (`user_id`,`term_id`);--> statement-breakpoint
CREATE INDEX `document_application_id_idx` ON `documents` (`application_id`);--> statement-breakpoint
CREATE INDEX `document_type_idx` ON `documents` (`type`);--> statement-breakpoint
CREATE INDEX `program_choice_application_id_idx` ON `program_choices` (`application_id`);--> statement-breakpoint
CREATE INDEX `program_choice_first_choice_idx` ON `program_choices` (`first_program_id`);--> statement-breakpoint
CREATE INDEX `program_choice_second_choice_idx` ON `program_choices` (`second_program_id`);--> statement-breakpoint
CREATE INDEX `program_qualification_program_id_idx` ON `program_qualifications` (`program_id`);--> statement-breakpoint
CREATE INDEX `program_qualification_qual_id_idx` ON `program_qualifications` (`qualification_id`);--> statement-breakpoint
CREATE INDEX `program_name_idx` ON `programs` (`name`);--> statement-breakpoint
CREATE INDEX `program_faculty_idx` ON `programs` (`faculty`);--> statement-breakpoint
CREATE INDEX `qualification_grade_name_idx` ON `qualification_grades` (`name`);--> statement-breakpoint
CREATE INDEX `qualification_grade_qual_id_idx` ON `qualification_grades` (`qualification_id`);--> statement-breakpoint
CREATE INDEX `qualification_grade_index_idx` ON `qualification_grades` (`index`);--> statement-breakpoint
CREATE INDEX `qualification_name_idx` ON `qualifications` (`name`);--> statement-breakpoint
CREATE INDEX `qualification_created_at_idx` ON `qualifications` (`created_at`);--> statement-breakpoint
CREATE INDEX `program_qualification_fk` ON `required_subjects` (`program_id`,`qualification_id`);--> statement-breakpoint
CREATE INDEX `required_subject_subject_id_idx` ON `required_subjects` (`subject_id`);--> statement-breakpoint
CREATE INDEX `required_subject_grade_id_idx` ON `required_subjects` (`grade_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `student_details_email_unique` ON `student_details` (`email`);--> statement-breakpoint
CREATE INDEX `student_email_idx` ON `student_details` (`email`);--> statement-breakpoint
CREATE INDEX `student_national_id_idx` ON `student_details` (`national_id`);--> statement-breakpoint
CREATE INDEX `student_name_idx` ON `student_details` (`name`);--> statement-breakpoint
CREATE INDEX `student_dob_idx` ON `student_details` (`date_of_birth`);--> statement-breakpoint
CREATE INDEX `student_high_school_idx` ON `student_details` (`high_school`);--> statement-breakpoint
CREATE INDEX `student_created_at_idx` ON `student_details` (`created_at`);--> statement-breakpoint
CREATE INDEX `student_qual_application_id_idx` ON `student_qualifications` (`application_id`);--> statement-breakpoint
CREATE INDEX `student_qual_qualification_id_idx` ON `student_qualifications` (`qualification_id`);--> statement-breakpoint
CREATE INDEX `student_subject_idx` ON `student_subjects` (`student_qualification_id`,`subject_id`);--> statement-breakpoint
CREATE INDEX `student_subject_grade_id_idx` ON `student_subjects` (`grade_id`);--> statement-breakpoint
CREATE INDEX `subject_name_idx` ON `subjects` (`name`);--> statement-breakpoint
CREATE INDEX `subject_code_idx` ON `subjects` (`code`);--> statement-breakpoint
CREATE INDEX `subject_qualification_id_idx` ON `subjects` (`qualification_id`);--> statement-breakpoint
CREATE INDEX `subject_commercial_idx` ON `subjects` (`is_commercial`);--> statement-breakpoint
CREATE UNIQUE INDEX `authenticators_credentialID_unique` ON `authenticators` (`credential_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `programs` ADD `code` text NOT NULL;