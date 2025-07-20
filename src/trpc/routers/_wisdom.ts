import { and, count, eq, or } from "drizzle-orm";
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
      .innerJoin(sign, eq(decan.signId, sign.id));

    // For each wisdom, get stardust type counts
    const wisdomIds = wisdoms.map(w => w.id);
    const stardustCounts: Record<string, Record<string, number>> = {};
    if (wisdomIds.length > 0) {
      const counts = await db
        .select({
          wisdomId: wisdomStardust.wisdomId,
          type: stardust.type,
          count: count(),
        })
        .from(wisdomStardust)
        .innerJoin(stardust, eq(wisdomStardust.startDustId, stardust.id))
        .where(or(...wisdomIds.map(id => eq(wisdomStardust.wisdomId, id))))
        .groupBy(wisdomStardust.wisdomId, stardust.type);
      for (const c of counts) {
        if (!stardustCounts[c.wisdomId]) {
          stardustCounts[c.wisdomId] = {};
        }
        stardustCounts[c.wisdomId][c.type] = Number(c.count);
      }
    }
    return wisdoms.map(w => ({
      id: w.id,
      content: w.content,
      username: w.username,
      createdAt: w.createdAt,
      userSign: w.userSign,
      stardustCounts: stardustCounts[w.id] || {},
    }));
  }),

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
          return { success: true, action: "removed" };
        }
        else {
          // Different type: update to new type
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
          return { success: true, action: "changed" };
        }
      }
      else {
        // No reaction: add new
        await db.insert(wisdomStardust).values({
          wisdomId: input.wisdomId,
          startDustId: sd.id,
          senderId: ctx.id,
        });
        return { success: true, action: "added" };
      }
    }),
});
