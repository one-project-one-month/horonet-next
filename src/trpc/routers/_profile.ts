import type { inferRouterOutputs } from "@trpc/server";

import { count, eq } from "drizzle-orm";
import { z } from "zod";

import { user } from "@/database/auth-schema";
import { db } from "@/database/drizzle";
import { decan, gift, sign, userDetail, userGift } from "@/database/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import type { AppRouter } from "./_app";

export const profileRouter = createTRPCRouter({
  getProfileInfo: protectedProcedure
    .input(z.string().optional())
    .query(async (opts) => {
      const userId = opts.input || opts.ctx.id;
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
        .where(eq(userDetail.userId, userId))
        .innerJoin(decan, eq(userDetail.decanId, decan.id))
        .innerJoin(user, eq(user.id, userId))
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
      return { isValidId: validation[0].id, isProfile: opts.ctx.id === opts.input };
    }),

  getStats: protectedProcedure
    .query(async (opts) => {
      const gifts = await db
        .select({ gift: gift.type, count: count() })
        .from(userGift)
        .where(eq(userGift.receiverId, opts.ctx.id))
        .innerJoin(gift, eq(gift.id, userGift.giftId))
        .groupBy(userGift.giftId, gift.id);
      return gifts;
    }),
});

export type TUserData = inferRouterOutputs<AppRouter>["getUserData"]["getProfileInfo"];
export type TStats = inferRouterOutputs<AppRouter>["getUserData"]["getStats"];
