import { pgEnum } from "drizzle-orm/pg-core";

export const elementEnum = pgEnum("element_enum", [
  "Fire",
  "Earth",
  "Air",
  "Water",
]);

export type Element = (typeof elementEnum.enumValues)[number];
