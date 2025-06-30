import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { decan, sign, userDetail } from "@/database/schema";

export const compatibilityRouter = createTRPCRouter({
    //Kinda stupid. Optimize later.
    getCurrentUserSign: protectedProcedure
    .input(z.string())
    .query(async (userID) => {

        const result = await db.select({
            signName: sign.name
        })
        .from(userDetail)
        .where(eq(userDetail.userId, userID.input))
        .leftJoin(decan, eq(decan.id, userDetail.decanId))
        .leftJoin(sign, eq(sign.id, decan.signId))

        return result[0]?.signName
    })

    
})