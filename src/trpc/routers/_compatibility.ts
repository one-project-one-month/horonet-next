import { eq } from "drizzle-orm";

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

});
