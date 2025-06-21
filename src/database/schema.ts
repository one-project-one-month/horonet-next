import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const category = pgTable("category", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("category", { length: 255 }).notNull().unique(),
  color: varchar({ length: 7 }).notNull(),
});
