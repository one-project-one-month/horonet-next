CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" varchar(255) NOT NULL,
	"color" varchar(7) NOT NULL,
	CONSTRAINT "category_id_unique" UNIQUE("id"),
	CONSTRAINT "category_category_unique" UNIQUE("category")
);
