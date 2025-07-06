import { db } from "@/database/drizzle";
import { giftEnum, startDustEnum } from "@/database/enums";
import { gift, stardust } from "@/database/schema";

try {
  await db.delete(stardust);
  await db.delete(gift);

  const starDusts = startDustEnum.enumValues.map(async (item) => {
    return db
      .insert(stardust)
      .values({
        type: item,
      })
      .returning();
  });

  await Promise.all(starDusts);

  const gifts = giftEnum.enumValues.map(async (item) => {
    return db.insert(gift).values({ type: item }).returning();
  });

  await Promise.all(gifts);
}
catch (e) {
  console.log(e);
}
