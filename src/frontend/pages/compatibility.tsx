import { useState } from "react";

import type { CompatiblePeopleInfo, CompatibleSignsInfo } from "@/components/compatibility/compatibility-custom-types";

import CompatiblePeople from "@/components/compatibility/compatible-people";
import WiseWords from "@/components/compatibility/wise-words";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/clitent";

;

export const CompatibilityPage = () => {
  const [page, setPage] = useState<number>(0);
  const getCurrentUserSign = trpc.compatibility.getCurrentUserSign.useQuery();
  const findCompatibleSigns = trpc.compatibility.findCompatibleSigns.useQuery(getCurrentUserSign.data?.signId as string);
  const findCompatiblePeople = trpc.compatibility.findCompatiblePeople.useQuery({
    compatibleSignIds: findCompatibleSigns.data?.map((d) => { return d.compatibleSignId; }) as string[],
    page,
    limit: 3,
  }, { enabled: true });

  // Dynamic {enabled} based on userLimitParam to stop it from fetching on initial render.
  // Passing in 'userLimit' directly causes it to refetch on every state change when setting limits via input.
  // Used a second state called 'userLimitParam' to trigger fetch.

  if (getCurrentUserSign.isLoading || findCompatibleSigns.isLoading) {
    return <div>Loading...</div>;
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="text-center">
      <WiseWords sign={getCurrentUserSign.data?.signName as string} />
      {
        findCompatiblePeople.isLoading || findCompatiblePeople.isFetching
          ? (
              <div>
                Finding...
              </div>
            )
          : (
              <div className="container mx-auto">
                <CompatiblePeople peopleList={findCompatiblePeople.data?.compatiblePeople as CompatiblePeopleInfo[]} compatibleSignsInfo={findCompatibleSigns.data as CompatibleSignsInfo[]} />
                <div className="flex justify-center gap-16 mt-6">
                  <Button variant={"cosmic"} disabled={!findCompatiblePeople.data?.hasPrev} onClick={prevPage}>Prev</Button>
                  <Button variant={"cosmic"} disabled={!findCompatiblePeople.data?.hasNext} onClick={nextPage}>Next</Button>
                </div>
              </div>
            )
      }
    </div>
  );
};
