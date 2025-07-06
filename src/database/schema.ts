import {
  date,
  doublePrecision,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { user } from "@/database/auth-schema";
import {
  compatibilityEnum,
  elementEnum,
  genderEnum,
  giftEnum,
  startDustEnum,
} from "@/database/enums";

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

export const compatibility = pgTable(
  "compatibility",
  {
    signId: uuid()
      .notNull()
      .references(() => sign.id, { onDelete: "cascade" }),
    counterpartSignId: uuid()
      .notNull()
      .references(() => sign.id),
    type: compatibilityEnum("type").notNull(),
    score: doublePrecision("score").notNull(),
    desc: text("description").notNull(),
  },
  t => [primaryKey({ columns: [t.signId, t.counterpartSignId] })],
);

export const wisdom = pgTable("wisdom", {
  id: uuid().notNull().primaryKey().defaultRandom().unique(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: varchar("content", { length: 280 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

/*
 * StarDust Table is a master data table.
 */
export const starDust = pgTable("starDust", {
  id: uuid().notNull().primaryKey().defaultRandom().unique(),
  type: startDustEnum("type").notNull(),
});

export const wisdomStardust = pgTable(
  "wisdomStardust",
  {
    wisdomId: uuid()
      .notNull()
      .references(() => wisdom.id, { onDelete: "cascade" }),
    startDustId: uuid()
      .notNull()
      .references(() => starDust.id, { onDelete: "cascade" }),
    senderId: text()
      .notNull()
      .references(() => user.id),
  },
  ws => [
    primaryKey({
      columns: [ws.wisdomId, ws.senderId],
    }),
  ],
);

/*
 * Gift Table is a master data table.
 */

export const gift = pgTable("gift", {
  id: uuid().notNull().primaryKey().defaultRandom().unique(),
  type: giftEnum("type").notNull(),
});

export const userGift = pgTable(
  "userGift",
  {
    receiverId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    senderId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    giftId: uuid().references(() => gift.id, { onDelete: "cascade" }),
  },
  ug => [
    primaryKey({
      columns: [ug.senderId, ug.receiverId, ug.giftId],
    }),
  ],
);
