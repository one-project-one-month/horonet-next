import type { User } from "better-auth";

import { useRouteLoaderData } from "react-router";

import { trpc } from "@/trpc/clitent";

import Info from "./info";
import Quotes from "./quotes";

export default function Profile() {
  const session = useRouteLoaderData("root") as User;
  const data = trpc.getUserData.getProfileInfo.useQuery(session.id);

  return (
    <section className="max-w-7xl mx-auto">
      <Info data={data} />
      <Quotes />
      <div className="h-dvh"></div>
    </section>
  );
}
