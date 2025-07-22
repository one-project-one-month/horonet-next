import { countDistinct, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { user } from "@/database/auth-schema";
import { db } from "@/database/drizzle";
import {
  decan,
  sign,
  userDetail,
  wisdom,
} from "@/database/schema";

import { createTRPCRouter, protectedProcedure } from "../init";

export const wisdomRouter = createTRPCRouter({
  // Fetch all wisdom with stardust type counts for each wisdom
  // Not efficient, plan to use with infinite scrolling in the future
  getAllWisdomWithStardustCounts: protectedProcedure.query(async () => {
    // Get all wisdom
    const wisdoms = await db
      .select({
        id: wisdom.id,
        content: wisdom.content,
        createdAt: wisdom.createdAt,
        userId: wisdom.userId,
        username: user.name,
        userSign: sign.name,
      })
      .from(wisdom)
      .innerJoin(user, eq(wisdom.userId, user.id))
      .innerJoin(userDetail, eq(userDetail.userId, wisdom.userId))
      .innerJoin(decan, eq(userDetail.decanId, decan.id))
      .innerJoin(sign, eq(decan.signId, sign.id))
      .orderBy(desc(wisdom.createdAt));

    return wisdoms.map(w => ({
      id: w.id,
      content: w.content,
      username: w.username,
      createdAt: w.createdAt,
      userSign: w.userSign,
    }));
  }),

  // Get user's quotes
  getUserQuotes: protectedProcedure.query(async ({ ctx }) => {
    const quotes = await db
      .select({
        id: wisdom.id,
        content: wisdom.content,
        createdAt: wisdom.createdAt,
        username: user.name,
        userSign: sign.name,
      })
      .from(wisdom)
      .where(eq(wisdom.userId, ctx.id))
      .innerJoin(user, eq(wisdom.userId, user.id))
      .innerJoin(userDetail, eq(userDetail.userId, ctx.id))
      .innerJoin(decan, eq(userDetail.decanId, decan.id))
      .innerJoin(sign, eq(decan.signId, sign.id));

    return quotes.map(q => ({
      id: q.id,
      content: q.content,
      createdAt: q.createdAt,
      username: q.username,
      userSign: q.userSign,
    }));
  }),

  getUserQuotesCount: protectedProcedure.query(async ({ ctx }) => {
    const quotesCount = await db
      .select({
        count: countDistinct(wisdom.id),
      })
      .from(wisdom)
      .where(eq(wisdom.userId, ctx.id));

    return quotesCount[0].count;
  }),

  // Create wisdom
  createWisdom: protectedProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await db
        .insert(wisdom)
        .values({ content: input.content, userId: ctx.id })
        .returning();
      if (res) {
        return { success: true };
      }
      return { success: false, message: "Failed to create wisdom" };
    }),
});
