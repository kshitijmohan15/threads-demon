CREATE TABLE IF NOT EXISTS "thread" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"parent_id" text,
	"dialogue_id" uuid
);
