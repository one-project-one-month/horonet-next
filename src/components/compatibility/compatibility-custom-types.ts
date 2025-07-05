import type { Gender } from "@/database/enums";

export type CompatiblePeopleInfo = {
  id: string;
  name: string;
  sign: string;
  gender: Gender;
};
