import { and, count, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { user } from "@/database/auth-schema";
import { db } from "@/database/drizzle";
import { startDustEnum } from "@/database/enums";
import {
  decan,
  sign,
  stardust,
  userDetail,
  wisdom,
  wisdomStardust,
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

  getStardustCountsByWisdomId: protectedProcedure
    .input(z.object({ wisdomId: z.string() }))
    .query(async ({ input }) => {
      const counts = await db
        .select({
          type: stardust.type,
          count: count(),
        })
        .from(wisdomStardust)
        .innerJoin(stardust, eq(wisdomStardust.startDustId, stardust.id))
        .where(eq(wisdomStardust.wisdomId, input.wisdomId))
        .groupBy(stardust.type);

      const result: Record<string, number> = {};
      for (const c of counts) {
        result[c.type] = Number(c.count);
      }

      return result;
    }),

  // Get user's stardust reaction for a wisdom
  getUserStardustReaction: protectedProcedure
    .input(z.object({ wisdomId: z.string() }))
    .query(async ({ input, ctx }) => {
      const existing = await db
        .select({
          type: stardust.type,
        })
        .from(wisdomStardust)
        .innerJoin(stardust, eq(wisdomStardust.startDustId, stardust.id))
        .where(
          and(
            eq(wisdomStardust.wisdomId, input.wisdomId),
            eq(wisdomStardust.senderId, ctx.id),
          ),
        );
      if (existing.length > 0) {
        return { stardustType: existing[0].type };
      }
      return { stardustType: null };
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

  // Mutation: react (add/remove) stardust to wisdom
  reactStardust: protectedProcedure
    .input(
      z.object({
        wisdomId: z.string(),
        stardustType: z.enum(startDustEnum.enumValues),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Find stardust id by type
      const [sd] = await db
        .select({ id: stardust.id })
        .from(stardust)
        .where(eq(stardust.type, input.stardustType));
      if (!sd) {
        throw new Error("Invalid stardust type");
      }
      // Check if user already reacted to this wisdom (any type)
      const existing = await db
        .select({ startDustId: wisdomStardust.startDustId })
        .from(wisdomStardust)
        .where(
          and(
            eq(wisdomStardust.wisdomId, input.wisdomId),
            eq(wisdomStardust.senderId, ctx.id),
          ),
        );
      if (existing.length > 0) {
        if (existing[0].startDustId === sd.id) {
          // Same type: remove (toggle off)
          await db.delete(wisdomStardust).where(
            and(
              eq(wisdomStardust.wisdomId, input.wisdomId),
              eq(wisdomStardust.startDustId, sd.id),
              eq(wisdomStardust.senderId, ctx.id),
            ),
          );
          return { success: true, action: "removed", stardustType: null };
        }
        else {
          await db.delete(wisdomStardust).where(
            and(
              eq(wisdomStardust.wisdomId, input.wisdomId),
              eq(wisdomStardust.senderId, ctx.id),
            ),
          );
          await db.insert(wisdomStardust).values({
            wisdomId: input.wisdomId,
            startDustId: sd.id,
            senderId: ctx.id,
          });
          return { success: true, action: "changed", stardustType: input.stardustType };
        }
      }
      else {
        await db.insert(wisdomStardust).values({
          wisdomId: input.wisdomId,
          startDustId: sd.id,
          senderId: ctx.id,
        });
        return { success: true, action: "added", stardustType: input.stardustType };
      }
    }),
});
