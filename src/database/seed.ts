import { db } from "@/database/drizzle";
import { decan, sign } from "@/database/schema";
import { DECANS, SIGNS } from "@/database/source";

try {
  console.log("Seeding Start....");
  await db.delete(sign);
  await db.delete(decan);

  const signs = SIGNS.map(async (item) => {
    const res = await db
      .insert(sign)
      // @ts-expect-error This type is so right compiler is dog shit
      .values({ ...item })
      .returning();
    return res;
  });
  await Promise.all(signs);

  const decans = DECANS.map(async (item) => {
    const res = await db
      .insert(decan)
      .values({
        signId: item.signId,
        periodEnd: item.periodEnd,
        periodStart: item.periodStart,
        traits: item.traits,
        description: item.description,
        rulingPlanet: item.rulingPlanet,
        decan: item.decan,
      })
      .returning();
    return res;
  });

  await Promise.all(decans);
  console.log("Seeding End....");
}
catch (e) {
  console.log(e);
}
