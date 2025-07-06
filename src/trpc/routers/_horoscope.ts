import { TRPCError } from "@trpc/server";
import axios from "axios";
import { z } from "zod";

import {
  horoscopeDaily,
  horoscopeMonthly,
  horoscopeWeekly,
} from "@/database/validators";

import { baseProcedure, createTRPCRouter } from "../init";

const BASE_URL = "https://horoscope-app-api.vercel.app/api/v1/get-horoscope";

export const horoscopeRouter = createTRPCRouter({
  daily: baseProcedure
    .input(
      z.object({
        sign: z.string(),
      }),
    )
    .query(async (opts) => {
      const response = await axios.get(
        `${BASE_URL}/daily?sign=${opts.input.sign}&day=TODAY`,
      );
      const parsedResponse = horoscopeDaily.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error Fetching Horoscope data",
        });
      }
      return parsedResponse.data.data;
    }),
  weekly: baseProcedure
    .input(
      z.object({
        sign: z.string(),
      }),
    )
    .query(async (opts) => {
      const response = await axios.get(
        `${BASE_URL}/weekly?sign=${opts.input.sign}`,
      );
      const parsedResponse = horoscopeWeekly.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error Fetching Horoscope data",
        });
      }
      return parsedResponse.data.data;
    }),
  monthly: baseProcedure
    .input(
      z.object({
        sign: z.string(),
      }),
    )
    .query(async (opts) => {
      const response = await axios.get(
        `${BASE_URL}/monthly?sign=${opts.input.sign}`,
      );
      const parsedResponse = horoscopeMonthly.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error Fetching Horoscope data",
        });
      }
      return parsedResponse.data.data;
    }),
});
