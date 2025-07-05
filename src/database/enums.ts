import { pgEnum } from "drizzle-orm/pg-core";

export const elementEnum = pgEnum("element_enum", [
  "Fire",
  "Earth",
  "Air",
  "Water",
]);

export const genderEnum = pgEnum("gender", ["MALE", "FEMALE", "OTHER"]);

export const compatibilityEnum = pgEnum("compatibility_enum", ["BEST", "CHALLENGING"]);

export type Element = (typeof elementEnum.enumValues)[number];
export type Gender = (typeof genderEnum.enumValues)[number];
export type Compatibility = (typeof compatibilityEnum.enumValues)[number];
