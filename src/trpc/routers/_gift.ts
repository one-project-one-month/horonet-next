import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/database/drizzle";
import { giftEnum } from "@/database/enums";
import { gift, userGift } from "@/database/schema";

import { createTRPCRouter, protectedProcedure } from "../init";

export const giftRouter = createTRPCRouter({
  sendGift: protectedProcedure
    .input(z.object({
      recieverId: z.string(),
      giftType: z.enum(giftEnum.enumValues),
    }))
    .mutation(async ({ input, ctx }) => {
      const giftTypeId = await db.select({ id: gift.id }).from(gift).where(eq(gift.type, input.giftType));

      try {
        await db.insert(userGift).values({
          receiverId: input.recieverId,
          senderId: ctx.id,
          giftId: giftTypeId[0].id,
        });
      }
      catch {
        throw new TRPCError({
          code: "CONFLICT",
        });
      }
    }),
});
