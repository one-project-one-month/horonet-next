import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/database/drizzle";
import { decan, sign, userDetail } from "@/database/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

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
          signId: decan.signId,
          sign: sign.name,
          element: sign.element,
        })
        .from(userDetail)
        .where(eq(userDetail.userId, opts.input))
        .innerJoin(decan, eq(userDetail.decanId, decan.id))
        .innerJoin(sign, eq(decan.signId, sign.id));
      return userData[0];
    }),
});
