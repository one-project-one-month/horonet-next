import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/database/drizzle";
import { decan, sign } from "@/database/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const signRouter = createTRPCRouter({
  selectById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opt) => {
      const [signInfo] = await db
        .select({
          name: sign.name,
          element: sign.element,
          traits: decan.traits,
          periodStart: sign.periodStart,
          periodEnd: sign.periodEnd,
          rulingPlanet: decan.rulingPlanet,
        })
        .from(sign)
        .innerJoin(decan, eq(sign.id, decan.signId))
        .where(eq(sign.id, opt.input.id));

      return signInfo;
    }),
});
