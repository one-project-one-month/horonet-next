import {
  date,
  integer,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { user } from "@/database/auth-schema";
import { elementEnum, genderEnum } from "@/database/enums";

export const sign = pgTable("sign", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 19 }).notNull(),
  element: elementEnum("element").notNull(),
  periodStart: varchar("period_start", { length: 5 }).notNull(),
  periodEnd: varchar("period_end", { length: 5 }).notNull(),
});

export const decan = pgTable("decan", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  signId: uuid("sign_id")
    .notNull()
    .references(() => sign.id),
  periodStart: varchar("period_start", { length: 5 }).notNull(),
  periodEnd: varchar("period_end", { length: 5 }).notNull(),
  description: text("description").notNull(),
  traits: text("traits").array().notNull().default([]),
  decan: integer("decan").notNull(),
  rulingPlanet: text("rulingPlanet").notNull(),
});

export const userDetail = pgTable("user_detail", {
  userId: text()
    .references(() => user.id, { onDelete: "cascade" })
    .primaryKey()
    .notNull(),
  birthday: date("birthday").notNull(),
  decanId: uuid("decan_id")
    .notNull()
    .references(() => decan.id),
  bio: text(),
  gender: genderEnum("gender").notNull(),
});
