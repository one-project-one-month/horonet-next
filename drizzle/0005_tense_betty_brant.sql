ALTER TABLE "userGift" RENAME TO "user_gift";--> statement-breakpoint
ALTER TABLE "wisdomStardust" RENAME TO "wisdom_stardust";--> statement-breakpoint
ALTER TABLE "user_gift" DROP CONSTRAINT "userGift_receiverId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_gift" DROP CONSTRAINT "userGift_senderId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_gift" DROP CONSTRAINT "userGift_giftId_gift_id_fk";
--> statement-breakpoint
ALTER TABLE "wisdom_stardust" DROP CONSTRAINT "wisdomStardust_wisdomId_wisdom_id_fk";
--> statement-breakpoint
ALTER TABLE "wisdom_stardust" DROP CONSTRAINT "wisdomStardust_startDustId_starDust_id_fk";
--> statement-breakpoint
ALTER TABLE "wisdom_stardust" DROP CONSTRAINT "wisdomStardust_senderId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_gift" DROP CONSTRAINT "userGift_senderId_receiverId_giftId_pk";--> statement-breakpoint
ALTER TABLE "wisdom_stardust" DROP CONSTRAINT "wisdomStardust_wisdomId_senderId_pk";--> statement-breakpoint
ALTER TABLE "user_gift" ADD CONSTRAINT "user_gift_senderId_receiverId_giftId_pk" PRIMARY KEY("senderId","receiverId","giftId");--> statement-breakpoint
ALTER TABLE "wisdom_stardust" ADD CONSTRAINT "wisdom_stardust_wisdomId_senderId_pk" PRIMARY KEY("wisdomId","senderId");--> statement-breakpoint
ALTER TABLE "user_gift" ADD CONSTRAINT "user_gift_receiverId_user_id_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_gift" ADD CONSTRAINT "user_gift_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_gift" ADD CONSTRAINT "user_gift_giftId_gift_id_fk" FOREIGN KEY ("giftId") REFERENCES "public"."gift"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wisdom_stardust" ADD CONSTRAINT "wisdom_stardust_wisdomId_wisdom_id_fk" FOREIGN KEY ("wisdomId") REFERENCES "public"."wisdom"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wisdom_stardust" ADD CONSTRAINT "wisdom_stardust_startDustId_starDust_id_fk" FOREIGN KEY ("startDustId") REFERENCES "public"."starDust"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wisdom_stardust" ADD CONSTRAINT "wisdom_stardust_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;