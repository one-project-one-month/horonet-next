ALTER TABLE "user_detail" DROP CONSTRAINT "user_detail_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;