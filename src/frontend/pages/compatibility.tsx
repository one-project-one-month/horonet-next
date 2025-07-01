import type { User } from "better-auth";

import { useRouteLoaderData } from "react-router";

import WiseWords from "@/components/compatibility/wise-words";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/clitent";

export const CompatibilityPage = () => {
  const currentUser: User = useRouteLoaderData("root") as User;
  const getCurrentUserSign = trpc.compatibility.getCurrentUserSign.useQuery(currentUser.id as string);

  if (getCurrentUserSign.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <WiseWords sign={getCurrentUserSign.data as string} />
      <Button className="mt-4" variant={"cosmic"}>Find companions</Button>
      {/*
          search results here
        */}
    </div>
  );
};
