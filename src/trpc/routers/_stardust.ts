import { and, count, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/database/drizzle";
import { startDustEnum } from "@/database/enums";
import { stardust, wisdomStardust } from "@/database/schema";

import { createTRPCRouter, protectedProcedure } from "../init";

export const stardustRouter = createTRPCRouter({

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
