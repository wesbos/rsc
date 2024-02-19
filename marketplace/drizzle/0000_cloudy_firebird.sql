CREATE TABLE `listings` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text,
	`title` text,
	`description` text,
	`price` integer,
	`user_id` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text,
	`email` text
);
