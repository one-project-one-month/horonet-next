CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE', 'OTHER');--> statement-breakpoint
ALTER TABLE "user_detail" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "user_detail" ADD COLUMN "gender" "gender" NOT NULL;