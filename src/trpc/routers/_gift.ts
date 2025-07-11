import { and, count, eq } from "drizzle-orm";
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
      alreadySent: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const giftTypeId = await db.select({ id: gift.id }).from(gift).where(eq(gift.type, input.giftType));

      if (input.alreadySent) {
        await db.delete(userGift).where(and(eq(userGift.senderId, ctx.id), eq(userGift.receiverId, input.recieverId), eq(userGift.giftId, giftTypeId[0].id)));
      }
      else {
        await db.insert(userGift).values({
          receiverId: input.recieverId,
          senderId: ctx.id,
          giftId: giftTypeId[0].id,
        });
      }
    }),

  giftButtonPreCheck: protectedProcedure
    .input(z.object({
      recieverId: z.string(),
      giftType: z.enum(giftEnum.enumValues),
    }))
    .query(async ({ input, ctx }) => {
      const giftTypeId = await db.select({ id: gift.id }).from(gift).where(eq(gift.type, input.giftType));

      const checkExistence = await db.select().from(userGift).where(and(eq(userGift.senderId, ctx.id), eq(userGift.receiverId, input.recieverId), eq(userGift.giftId, giftTypeId[0].id)));

      const giftSent = checkExistence.length > 0;

      const getGiftCount = await db.select({ giftCount: count() }).from(userGift).where(and(eq(userGift.receiverId, input.recieverId), eq(userGift.giftId, giftTypeId[0].id)));

      return (
        {
          giftAlreadySent: giftSent,
          giftCount: getGiftCount[0].giftCount,
        }
      );
    }),
});
