import { z } from "zod";

import { onboardRouter } from "@/trpc/routers/_onboarding";
import { signRouter } from "@/trpc/routers/_sign";

import { baseProcedure, createTRPCRouter } from "../init";
import { compatibilityRouter } from "./_compatibility";
import { giftRouter } from "./_gift";
import { horoscopeRouter } from "./_horoscope";
import { profileRouter } from "./_profile";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  onboard: onboardRouter,
  sign: signRouter,
  compatibility: compatibilityRouter,
  horoscope: horoscopeRouter,
  getUserData: profileRouter,
  gifts: giftRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
