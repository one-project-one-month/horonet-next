import axios from "axios";
import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "../init";

const BASE_URL
  = "'https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily";

export const horoscopeRouter = createTRPCRouter({
  daily: baseProcedure
    .input(
      z.object({
        sign: z.string(),
      }),
    )
    .query(async (opts) => {
      console.log(opts);
      const response = await axios.get(
        `${BASE_URL}/daily?sign=${opts.input.sign}&day=TODAY`,
      );
      console.log(response);
      return response.data;
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
      return response.data;
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
      return response.data;
    }),
});
