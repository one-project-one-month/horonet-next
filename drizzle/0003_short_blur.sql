CREATE TYPE "public"."compatibility_enum" AS ENUM('BEST', 'CHALLENGING');--> statement-breakpoint
CREATE TABLE "compatibility" (
	"signId" uuid NOT NULL,
	"counterpartSignId" uuid NOT NULL,
	"type" "compatibility_enum" NOT NULL,
	"score" double precision NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "compatibility_signId_counterpartSignId_pk" PRIMARY KEY("signId","counterpartSignId")
);
--> statement-breakpoint
ALTER TABLE "compatibility" ADD CONSTRAINT "compatibility_signId_sign_id_fk" FOREIGN KEY ("signId") REFERENCES "public"."sign"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compatibility" ADD CONSTRAINT "compatibility_counterpartSignId_sign_id_fk" FOREIGN KEY ("counterpartSignId") REFERENCES "public"."sign"("id") ON DELETE no action ON UPDATE no action;