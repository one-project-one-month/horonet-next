import { db } from "@/database/drizzle";

import { compatibility } from "./compatibility-schema";
import { COMPATIBILITY_DATA } from "./compatibility-source";

try {
  console.log("Seeding Compatibility data....");
  await db.delete(compatibility);

  const compatibilityData = COMPATIBILITY_DATA.map(async (item) => {
    const bestMatches = item.bestMatches.map(async (best) => {
      const res = await db
        .insert(compatibility)
        .values({
          signId: item.sign,
          counterpartSignId: best.sign,
          type: "BEST",
          score: best.score,
          desc: best.title,
        })
        .returning();
      return res;
    });

    await Promise.all(bestMatches);

    const challengingMatches = item.challengingMatches.map(async (challenging) => {
      const res = await db
        .insert(compatibility)
        .values({
          signId: item.sign,
          counterpartSignId: challenging.sign,
          type: "CHALLENGING",
          score: challenging.score,
          desc: challenging.title,
        })
        .returning();
      return res;
    });

    return await Promise.all(challengingMatches);
  });

  await Promise.all(compatibilityData);
  console.log("Seeding compatibility data done....");
}
catch (e) {
  console.log(e);
}
