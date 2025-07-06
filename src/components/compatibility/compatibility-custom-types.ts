import type { Gender } from "@/database/enums";

export type CompatiblePeopleInfo = {
  id: string;
  name: string;
  sign: string;
  bio: string;
  gender: Gender;
};

export type CompatibleSignsInfo = {
  compatibleSignId: string;
  compatibleSignName: string;
  chemistry: string;
  score: number;
};
