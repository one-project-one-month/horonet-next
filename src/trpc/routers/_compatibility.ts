import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/database/drizzle";
import { decan, sign, userDetail } from "@/database/schema";

import { createTRPCRouter, protectedProcedure } from "../init";

export const compatibilityRouter = createTRPCRouter({
  // Kinda stupid. Optimize later.
  getCurrentUserSign: protectedProcedure
    .query(async ({ ctx }) => {
      const result = await db.select({
        signName: sign.name,
      })
        .from(userDetail)
        .where(eq(userDetail.userId, ctx.id))
        .leftJoin(decan, eq(decan.id, userDetail.decanId))
        .leftJoin(sign, eq(sign.id, decan.signId));

      return result[0]?.signName;
    }),

  findCompatibleSigns: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return `This will return signs that are compatible with ${input}`;
    }),

  findCompatiblePeople: protectedProcedure
    .input(z.object({
      sign: z.string(),
      limit: z.number().nullable(),
    }))
    .query(async ({ input }) => {
      return `This will return an array of ${input.sign}-compatible users with a limit of ${(input.limit && input.limit !== 0) ? input.limit : "none"}.`;
    }),
});
