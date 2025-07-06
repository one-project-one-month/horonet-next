import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { format, set } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseDate = (date: Date): string => {
  return format(date, "MM-dd");
};

export const parseToDate = (dateShard: string) => {
  return format(
    set(new Date(2000, 1, 1), {
      date: Number.parseInt(dateShard.substring(3, 6)),
      month: Number.parseInt(dateShard.substring(0, 2)) - 1,
    }),
    "MMM dd",
  );
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const parseDateFromNum = (date: string) => {
  return format(set(new Date(), { date: Number.parseInt(date) }), "do MMMM");
};
