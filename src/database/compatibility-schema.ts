import { doublePrecision, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";

import { compatibilityEnum } from "./enums";
import { sign } from "./schema";

export const compatibility = pgTable("compatibility", {
  signId: uuid().notNull().references(() => sign.id, { onDelete: "cascade" }),
  counterpartSignId: uuid().notNull().references(() => sign.id),
  type: compatibilityEnum("type").notNull(),
  score: doublePrecision("score").notNull(),
  desc: text("description").notNull(),
}, t => [
  primaryKey({ columns: [t.signId, t.counterpartSignId] }),
]);
