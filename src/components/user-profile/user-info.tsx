import { trpc } from "@/trpc/clitent";

import Info from "../profile/info";

export default function UserInfo({ userId }: { userId: string }) {
  const data = trpc.getUserData.getProfileInfo.useQuery(userId);
  return (
    <section className="max-w-7xl mx-auto">
      <Info data={data} />
    </section>
  );
}
