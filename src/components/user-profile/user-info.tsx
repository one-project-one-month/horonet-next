import { trpc } from "@/trpc/clitent";

import Info from "../profile/info";
import UserQuotes from "./user-quotes";

export default function UserInfo({ userId }: { userId: string }) {
  const data = trpc.getUserData.getProfileInfo.useQuery(userId);
  return (
    <section className="max-w-7xl mx-auto">
      <Info data={data} self={false} />
      <UserQuotes id={data.data?.userId} />
    </section>
  );
}
