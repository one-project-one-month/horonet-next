import type { CompatiblePeopleInfo } from "./compatibility-custom-types";

export const BASE_SVG_PATH = "/assets/icons/compatibilityIcons";

// Temporary Data to test. Remove after seeding actual data
export const compatiblePeople: CompatiblePeopleInfo[] = [
  { id: "1", name: "James Charles", sign: "Gemini", gender: "OTHER" },
  { id: "2", name: "Margaret Thatcher", sign: "Libra", gender: "FEMALE" },
  { id: "3", name: "Jimi Hendrix", sign: "Sagittarius", gender: "MALE" },
];
