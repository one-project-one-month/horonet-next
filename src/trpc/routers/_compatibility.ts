import { and, eq, or, sql } from "drizzle-orm";
import { z } from "zod";

import { user } from "@/database/auth-schema";
import { db } from "@/database/drizzle";
import { compatibility, decan, sign, userDetail } from "@/database/schema";

import { createTRPCRouter, protectedProcedure } from "../init";

export const compatibilityRouter = createTRPCRouter({
  // Kinda stupid. Optimize later.
  getCurrentUserSign: protectedProcedure
    .query(async ({ ctx }) => {
      const result = await db.select({
        signId: sign.id,
        signName: sign.name,
      })
        .from(userDetail)
        .where(eq(userDetail.userId, ctx.id))
        .innerJoin(decan, eq(decan.id, userDetail.decanId))
        .innerJoin(sign, eq(sign.id, decan.signId));

      return result[0];
    }),

  findCompatibleSigns: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const result = await db.select({
        compatibleSignId: sign.id,
        compatibleSignName: sign.name,
        chemistry: compatibility.desc,
        score: compatibility.score,
      })
        .from(compatibility)
        .where(and(eq(compatibility.signId, input), eq(compatibility.type, "BEST")))
        .innerJoin(sign, eq(sign.id, compatibility.counterpartSignId));

      return result;
    }),

  findCompatiblePeople: protectedProcedure
    .input(z.object({
      compatibleSignIds: z.array(z.string()),
      limit: z.number().nullable(),
    }))
    .query(async ({ input }) => {
      if (!input.limit && input.limit !== 0) {
        const result = await db.select({
          id: user.id,
          name: user.name,
          sign: sign.name,
          bio: userDetail.bio,
          gender: userDetail.gender,
        })
          .from(sign)
          .where(or(
            eq(sign.id, input.compatibleSignIds[0]),
            eq(sign.id, input.compatibleSignIds[1]),
            eq(sign.id, input.compatibleSignIds[2]),
            eq(sign.id, input.compatibleSignIds[3]),
          ))
          .innerJoin(decan, eq(decan.signId, sign.id))
          .innerJoin(userDetail, eq(userDetail.decanId, decan.id))
          .innerJoin(user, eq(userDetail.userId, user.id))
          .orderBy(sql`RANDOM()`);

        return result;
      }
      else {
        const result = await db.select({
          id: user.id,
          name: user.name,
          sign: sign.name,
          bio: userDetail.bio,
          gender: userDetail.gender,
        })
          .from(sign)
          .where(or(
            eq(sign.id, input.compatibleSignIds[0]),
            eq(sign.id, input.compatibleSignIds[1]),
            eq(sign.id, input.compatibleSignIds[2]),
            eq(sign.id, input.compatibleSignIds[3]),
          ))
          .innerJoin(decan, eq(decan.signId, sign.id))
          .innerJoin(userDetail, eq(userDetail.decanId, decan.id))
          .innerJoin(user, eq(userDetail.userId, user.id))
          .limit(input.limit)
          .orderBy(sql`RANDOM()`);

        return result;
      }
    }),
});
