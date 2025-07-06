import type { inferRouterOutputs } from "@trpc/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { user } from "@/database/auth-schema";
import { db } from "@/database/drizzle";
import { decan, sign, userDetail } from "@/database/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import type { AppRouter } from "./_app";

export const profileRouter = createTRPCRouter({
  getProfileInfo: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const userData = await db
        .select({
          userId: userDetail.userId,
          birthday: userDetail.birthday,
          bio: userDetail.bio,
          gender: userDetail.gender,
          decanId: userDetail.decanId,
          decan: decan.decan,
          traits: decan.traits,
          planet: decan.rulingPlanet,
          signId: decan.signId,
          sign: sign.name,
          element: sign.element,
          username: user.name,
        })
        .from(userDetail)
        .where(eq(userDetail.userId, opts.input))
        .innerJoin(decan, eq(userDetail.decanId, decan.id))
        .innerJoin(user, eq(user.id, opts.input))
        .innerJoin(sign, eq(decan.signId, sign.id));
      return userData[0];
    }),

  validateUserId: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const validation = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.id, opts.input));
      return validation[0].id;
    }),
});

export type TUserData = inferRouterOutputs<AppRouter>["getUserData"]["getProfileInfo"];
