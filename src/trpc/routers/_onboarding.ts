import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import type { Gender } from "@/database/enums";
import type { CommonProcedureResult } from "@/lib/custom.types";

import { user } from "@/database/auth-schema";
import { db } from "@/database/drizzle";
import { userDetail } from "@/database/schema";
import { parseDate } from "@/lib/utils";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

export const onboardRouter = createTRPCRouter({
  canOnboard: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (otp) => {
      try {
        const [userInfo] = await db
          .select({
            userId: user.id,
            detailId: userDetail.userId,
          })
          .from(user)
          .leftJoin(userDetail, eq(userDetail.userId, user.id))
          .where(eq(user.id, otp.input.id));

        return {
          canOnboard: userInfo && userInfo.userId && !userInfo.detailId,
        };
      }
      catch (e) {
        console.log(e);
        return {
          canOnboard: false,
        };
      }
    }),
  onboardUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        birthday: z.string(),
        gender: z.string(),
        bio: z.string().optional(),
      }),
    )
    .mutation(async (otp): CommonProcedureResult<{ signId: string }> => {
      try {
        const birthday = new Date(otp.input.birthday);

        // Parsed the birthday into format which is used in the db
        const parsedBirthday = parseDate(birthday);

        /**
         *  Extract the decan information by using users' birthday
         *  But drizzle can only process raw query argument
         *  So when extracting the data we have to use the actual row name not
         *  the name we define the in schema.ts file
         */
        const [decanInfo] = await db
          .execute(
            sql`
                SELECT *
                FROM decan
                WHERE ${parsedBirthday} >= period_start
                  AND ${parsedBirthday} <= period_end
            `,
          )
          .then(data => data.rows);

        // Update the user detail information
        const [userInfo] = await db
          .insert(userDetail)
          .values({
            // @ts-expect-error this type is correct
            userId: otp.input.id,
            decanId: decanInfo.id,
            birthday,
            gender: otp.input.gender as unknown as Gender,
            bio: otp.input.bio,
          })
          .returning();

        if (!userInfo) {
          return {
            success: false,
            message: "Operation Failed",
          };
        }

        return {
          success: true,
          // we have too use decanInfo.sign_id not decanInfo.signId because we used execute() method
          data: { signId: decanInfo.sign_id as string },
        };
      }
      catch (error) {
        if (error instanceof Error) {
          return {
            success: false,
            message: error.message,
          };
        }
        return {
          success: false,
          message: "Operation Failed!",
        };
      }
    }),
});
