import { pgEnum } from "drizzle-orm/pg-core";

export const elementEnum = pgEnum("element_enum", [
  "Fire",
  "Earth",
  "Air",
  "Water",
]);

export const genderEnum = pgEnum("gender", ["MALE", "FEMALE", "OTHER"]);

export const compatibilityEnum = pgEnum("compatibility_enum", [
  "BEST",
  "CHALLENGING",
]);

export const startDustEnum = pgEnum("start_dust_enum", [
  "Nebula",
  "Glimmer",
  "Lumen",
]);

export const giftEnum = pgEnum("gift_enum", ["Fortune Cookie", "Rose"]);

export type Element = (typeof elementEnum.enumValues)[number];
export type Gender = (typeof genderEnum.enumValues)[number];
export type Compatibility = (typeof compatibilityEnum.enumValues)[number];
