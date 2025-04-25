ALTER TABLE "user" ADD COLUMN "country_code" integer;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastLogin" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_unique" UNIQUE("id");