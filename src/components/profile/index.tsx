import { trpc } from "@/trpc/clitent";

import Info from "./info";
import Quotes from "./quotes";

export default function Profile() {
  const data = trpc.getUserData.getProfileInfo.useQuery();
  const { data: stats } = trpc.getUserData.getStats.useQuery();

  return (
    <section className="max-w-7xl mx-auto">
      <Info data={data} stats={stats} />
      <Quotes />
    </section>
  );
}
