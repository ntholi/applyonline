CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`submission_date` integer DEFAULT (unixepoch()),
	`review_date` integer,
	`reviewer_id` text,
	`current_step` integer NOT NULL,
	`term_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`reviewer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`term_id`) REFERENCES `terms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `application_user_id_idx` ON `applications` (`user_id`);--> statement-breakpoint
CREATE INDEX `application_status_idx` ON `applications` (`status`);--> statement-breakpoint
CREATE INDEX `application_submission_date_idx` ON `applications` (`submission_date`);--> statement-breakpoint
CREATE UNIQUE INDEX `applications_userId_termId_unique` ON `applications` (`user_id`,`term_id`);--> statement-breakpoint
CREATE TABLE `documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`application_id` integer NOT NULL,
	`file_name` text NOT NULL,
	`url` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `document_application_id_idx` ON `documents` (`application_id`);--> statement-breakpoint
CREATE INDEX `document_type_idx` ON `documents` (`type`);--> statement-breakpoint
CREATE TABLE `program_choices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`application_id` integer NOT NULL,
	`first_program_id` integer NOT NULL,
	`second_program_id` integer,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`first_program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`second_program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `program_choice_application_id_idx` ON `program_choices` (`application_id`);--> statement-breakpoint
CREATE INDEX `program_choice_first_choice_idx` ON `program_choices` (`first_program_id`);--> statement-breakpoint
CREATE INDEX `program_choice_second_choice_idx` ON `program_choices` (`second_program_id`);--> statement-breakpoint
CREATE TABLE `program_qualifications` (
	`program_id` integer NOT NULL,
	`qualification_id` integer NOT NULL,
	`min_credits` integer NOT NULL,
	`min_passes` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	PRIMARY KEY(`program_id`, `qualification_id`),
	FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`qualification_id`) REFERENCES `qualifications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `program_qualification_program_id_idx` ON `program_qualifications` (`program_id`);--> statement-breakpoint
CREATE INDEX `program_qualification_qual_id_idx` ON `program_qualifications` (`qualification_id`);--> statement-breakpoint
CREATE TABLE `programs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`faculty` text,
	`description` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `program_name_idx` ON `programs` (`name`);--> statement-breakpoint
CREATE INDEX `program_faculty_idx` ON `programs` (`faculty`);--> statement-breakpoint
CREATE TABLE `qualification_grades` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`qualification_id` integer NOT NULL,
	`index` integer NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`qualification_id`) REFERENCES `qualifications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `qualification_grade_name_idx` ON `qualification_grades` (`name`);--> statement-breakpoint
CREATE INDEX `qualification_grade_qual_id_idx` ON `qualification_grades` (`qualification_id`);--> statement-breakpoint
CREATE INDEX `qualification_grade_index_idx` ON `qualification_grades` (`index`);--> statement-breakpoint
CREATE TABLE `qualifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `qualification_name_idx` ON `qualifications` (`name`);--> statement-breakpoint
CREATE INDEX `qualification_created_at_idx` ON `qualifications` (`created_at`);--> statement-breakpoint
CREATE TABLE `required_subjects` (
	`program_id` integer NOT NULL,
	`qualification_id` integer NOT NULL,
	`subject_id` integer NOT NULL,
	`grade_id` integer NOT NULL,
	`mandatory` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	PRIMARY KEY(`program_id`, `qualification_id`, `subject_id`),
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`grade_id`) REFERENCES `qualification_grades`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `program_qualification_fk` ON `required_subjects` (`program_id`,`qualification_id`);--> statement-breakpoint
CREATE INDEX `required_subject_subject_id_idx` ON `required_subjects` (`subject_id`);--> statement-breakpoint
CREATE INDEX `required_subject_grade_id_idx` ON `required_subjects` (`grade_id`);--> statement-breakpoint
CREATE TABLE `student_details` (
	`user_id` text PRIMARY KEY NOT NULL,
	`national_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone1` text NOT NULL,
	`phone2` text,
	`religion` text NOT NULL,
	`date_of_birth` integer NOT NULL,
	`gender` text NOT NULL,
	`marital_status` text NOT NULL,
	`birth_place` text NOT NULL,
	`home_town` text NOT NULL,
	`high_school` text NOT NULL,
	`next_of_kin_names` text NOT NULL,
	`next_of_kin_phone` text NOT NULL,
	`next_of_kin_relationship` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `student_details_email_unique` ON `student_details` (`email`);--> statement-breakpoint
CREATE INDEX `student_email_idx` ON `student_details` (`email`);--> statement-breakpoint
CREATE INDEX `student_national_id_idx` ON `student_details` (`national_id`);--> statement-breakpoint
CREATE INDEX `student_name_idx` ON `student_details` (`name`);--> statement-breakpoint
CREATE INDEX `student_dob_idx` ON `student_details` (`date_of_birth`);--> statement-breakpoint
CREATE INDEX `student_high_school_idx` ON `student_details` (`high_school`);--> statement-breakpoint
CREATE INDEX `student_created_at_idx` ON `student_details` (`created_at`);--> statement-breakpoint
CREATE TABLE `student_qualifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`application_id` integer NOT NULL,
	`qualification_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`qualification_id`) REFERENCES `qualifications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `student_qual_application_id_idx` ON `student_qualifications` (`application_id`);--> statement-breakpoint
CREATE INDEX `student_qual_qualification_id_idx` ON `student_qualifications` (`qualification_id`);--> statement-breakpoint
CREATE TABLE `student_subjects` (
	`student_qualification_id` integer NOT NULL,
	`subject_id` integer NOT NULL,
	`grade_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	PRIMARY KEY(`student_qualification_id`, `subject_id`),
	FOREIGN KEY (`student_qualification_id`) REFERENCES `student_qualifications`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`grade_id`) REFERENCES `qualification_grades`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `student_subject_idx` ON `student_subjects` (`student_qualification_id`,`subject_id`);--> statement-breakpoint
CREATE INDEX `student_subject_grade_id_idx` ON `student_subjects` (`grade_id`);--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`qualification_id` integer NOT NULL,
	`is_commercial` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`qualification_id`) REFERENCES `qualifications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `subject_name_idx` ON `subjects` (`name`);--> statement-breakpoint
CREATE INDEX `subject_code_idx` ON `subjects` (`code`);--> statement-breakpoint
CREATE INDEX `subject_qualification_id_idx` ON `subjects` (`qualification_id`);--> statement-breakpoint
CREATE INDEX `subject_commercial_idx` ON `subjects` (`is_commercial`);--> statement-breakpoint
CREATE TABLE `terms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`is_active` integer DEFAULT false,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `provider_account_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `authenticators` (
	`credential_id` text NOT NULL,
	`user_id` text NOT NULL,
	`provider_account_id` text NOT NULL,
	`credential_public_key` text NOT NULL,
	`counter` integer NOT NULL,
	`credential_device_type` text NOT NULL,
	`credential_backed_up` integer NOT NULL,
	`transports` text,
	PRIMARY KEY(`user_id`, `credential_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authenticators_credentialID_unique` ON `authenticators` (`credential_id`);--> statement-breakpoint
CREATE TABLE `session` (
	`session_token` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`name` text,
	`email` text,
	`email_verified` integer,
	`image` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
