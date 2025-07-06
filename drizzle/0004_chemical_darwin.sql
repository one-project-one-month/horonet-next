CREATE TYPE "public"."gift_enum" AS ENUM('Fortune Cookie', 'Rose');--> statement-breakpoint
CREATE TYPE "public"."start_dust_enum" AS ENUM('Nebula', 'Glimmer', 'Lumen');--> statement-breakpoint
CREATE TABLE "gift" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "gift_enum" NOT NULL,
	CONSTRAINT "gift_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "starDust" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "start_dust_enum" NOT NULL,
	CONSTRAINT "starDust_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "userGift" (
	"receiverId" text NOT NULL,
	"senderId" text NOT NULL,
	"giftId" uuid,
	CONSTRAINT "userGift_senderId_receiverId_giftId_pk" PRIMARY KEY("senderId","receiverId","giftId")
);
--> statement-breakpoint
CREATE TABLE "wisdom" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"content" varchar(280) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "wisdom_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "wisdomStardust" (
	"wisdomId" uuid NOT NULL,
	"startDustId" uuid NOT NULL,
	"senderId" text NOT NULL,
	CONSTRAINT "wisdomStardust_wisdomId_senderId_pk" PRIMARY KEY("wisdomId","senderId")
);
--> statement-breakpoint
ALTER TABLE "userGift" ADD CONSTRAINT "userGift_receiverId_user_id_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userGift" ADD CONSTRAINT "userGift_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userGift" ADD CONSTRAINT "userGift_giftId_gift_id_fk" FOREIGN KEY ("giftId") REFERENCES "public"."gift"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wisdom" ADD CONSTRAINT "wisdom_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wisdomStardust" ADD CONSTRAINT "wisdomStardust_wisdomId_wisdom_id_fk" FOREIGN KEY ("wisdomId") REFERENCES "public"."wisdom"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wisdomStardust" ADD CONSTRAINT "wisdomStardust_startDustId_starDust_id_fk" FOREIGN KEY ("startDustId") REFERENCES "public"."starDust"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wisdomStardust" ADD CONSTRAINT "wisdomStardust_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;