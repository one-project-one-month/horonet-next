import { useState } from "react";

import type { CompatiblePeopleInfo, CompatibleSignsInfo } from "@/components/compatibility/compatibility-custom-types";

import LoadingSpinner from "@/components/common/loading-spinner";
import CompatiblePeople from "@/components/compatibility/compatible-people";
import WiseWords from "@/components/compatibility/wise-words";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/clitent";

export const CompatibilityPage = () => {
  const [page, setPage] = useState<number>(0);
  const getCurrentUserSign = trpc.compatibility.getCurrentUserSign.useQuery();
  const findCompatibleSigns = trpc.compatibility.findCompatibleSigns.useQuery(getCurrentUserSign.data?.signId as string);
  const findCompatiblePeople = trpc.compatibility.findCompatiblePeople.useQuery({
    compatibleSignIds: findCompatibleSigns.data?.map((d) => { return d.compatibleSignId; }) as string[],
    page,
    limit: 6,
  }, { enabled: true });

  if (getCurrentUserSign.isLoading || findCompatibleSigns.isLoading) {
    return (
      <div
        className={
          "w-full py-16 mt-5"
        }
      >
        <LoadingSpinner />
        <h2 className={"mt-16 text-2xl text-white font-bold text-center"}>
          Let me have a look...
        </h2>
      </div>
    );
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
    <div className="text-center p-2">
      <WiseWords sign={getCurrentUserSign.data?.signName as string} />

      <div className="container mx-auto bg-white/10 border-white/20 backdrop-blur-lg rounded-md p-3 mt-8">
        {
          findCompatiblePeople.isLoading || findCompatiblePeople.isFetching
            ? (
                <div
                  className={
                    "w-full py-16 mt-5"
                  }
                >
                  <LoadingSpinner />
                  <h2 className={"mt-16 text-2xl text-white font-bold text-center"}>
                    Gliding through the cosmos...
                  </h2>
                  <p className={"text-white/40 text-center"}>
                    How shall your stars align?
                  </p>
                </div>
              )
            : (
                <div>
                  <CompatiblePeople peopleList={findCompatiblePeople.data?.compatiblePeople as CompatiblePeopleInfo[]} compatibleSignsInfo={findCompatibleSigns.data as CompatibleSignsInfo[]} />
                  <div className="flex justify-center gap-16 mt-6">
                    <Button variant={"cosmic"} disabled={!findCompatiblePeople.data?.hasPrev} onClick={prevPage}>Prev</Button>
                    <Button variant={"cosmic"} disabled={!findCompatiblePeople.data?.hasNext} onClick={nextPage}>Next</Button>
                  </div>
                </div>
              )
        }
      </div>
    </div>
  );
};
