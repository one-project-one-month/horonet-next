CREATE TYPE "public"."element_enum" AS ENUM('Fire', 'Earth', 'Air', 'Water');--> statement-breakpoint
CREATE TABLE "decan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sign_id" uuid NOT NULL,
	"period_start" varchar(5) NOT NULL,
	"period_end" varchar(5) NOT NULL,
	"description" text NOT NULL,
	"traits" text[] DEFAULT '{}' NOT NULL,
	"decan" integer NOT NULL,
	"rulingPlanet" text NOT NULL,
	CONSTRAINT "decan_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "sign" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(19) NOT NULL,
	"element" "element_enum" NOT NULL,
	"period_start" varchar(5) NOT NULL,
	"period_end" varchar(5) NOT NULL,
	CONSTRAINT "sign_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user_detail" (
	"userId" text PRIMARY KEY NOT NULL,
	"birthday" date NOT NULL,
	"decan_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "decan" ADD CONSTRAINT "decan_sign_id_sign_id_fk" FOREIGN KEY ("sign_id") REFERENCES "public"."sign"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_decan_id_decan_id_fk" FOREIGN KEY ("decan_id") REFERENCES "public"."decan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;