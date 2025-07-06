import type { ChangeEvent } from "react";

import { useState } from "react";

import type { CompatiblePeopleInfo, CompatibleSignsInfo } from "@/components/compatibility/compatibility-custom-types";

import CompatiblePeople from "@/components/compatibility/compatible-people";
import WiseWords from "@/components/compatibility/wise-words";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/clitent";

export const CompatibilityPage = () => {
  const trpcUtil = trpc.useUtils();
  const [limitSearch, setLimitSearch] = useState<boolean>(false);
  const [userLimit, setUserLimit] = useState<number>(10);
  const [userLimitParam, setUserLimitParam] = useState<number | null>(null);

  const getCurrentUserSign = trpc.compatibility.getCurrentUserSign.useQuery();
  const findCompatibleSigns = trpc.compatibility.findCompatibleSigns.useQuery(getCurrentUserSign.data?.signId as string);
  const findCompatiblePeople = trpc.compatibility.findCompatiblePeople.useQuery({
    compatibleSignIds: findCompatibleSigns.data?.map((d) => { return d.compatibleSignId; }) as string[],
    limit: limitSearch ? userLimitParam : null,
  }, { enabled: !!userLimitParam });
  // Dynamic {enabled} based on userLimitParam to stop it from fetching on initial render.
  // Passing in 'userLimit' directly causes it to refetch on every state change when setting limits via input.
  // Used a second state called 'userLimitParam' to trigger fetch.

  if (getCurrentUserSign.isLoading || findCompatibleSigns.isLoading) {
    return <div>Loading...</div>;
  }

  const flipLimitSearch = () => {
    setLimitSearch(!limitSearch);
  };

  const decreaseUserLimit = () => {
    if (userLimit > 0) {
      setUserLimit(userLimit - 1);
    }
  };

  const increaseUserLimit = () => {
    setUserLimit(userLimit + 1);
  };

  const manualUserLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue;

    if (e.target.value === "") {
      newValue = 0;
    }
    else {
      newValue = Number(e.target.value);
    }

    if (newValue >= 0) {
      setUserLimit(newValue);
    }
  };

  const findCompatiblePeopleFunc = () => {
    trpcUtil.compatibility.findCompatiblePeople.invalidate(); // Clear cache
    // Changing this state causes trpc to fetch.
    // This also set a value in 'userLimitParam', which enables the {enabled} field.
    setUserLimitParam(userLimit);
  };

  return (
    <div className="text-center">
      <WiseWords sign={getCurrentUserSign.data?.signName as string} />
      {/* Refactor later */}
      <Button
        className="mt-4"
        variant={"cosmic"}
        onClick={() => {
          findCompatiblePeopleFunc();
        }}
      >Find companions
      </Button>

      <div className="flex justify-center mt-4 gap-1.5">
        <Button disabled={!limitSearch} onClick={increaseUserLimit}>+</Button>
        <Input disabled={!limitSearch} value={userLimit} type="text" onChange={manualUserLimitChange} className="object-contain w-24 text-center" />
        <Button disabled={!limitSearch} onClick={decreaseUserLimit}>-</Button>
      </div>

      <div className="flex justify-center mt-2 gap-1.5 items-center mb-8">
        <Checkbox id="limitCheckBox" checked={limitSearch} onClick={flipLimitSearch} />
        <label htmlFor="limitCheckBox">Limit search</label>
      </div>

      {
        findCompatiblePeople.isLoading || findCompatiblePeople.isFetching
          ? (
              <div>
                Finding...
              </div>
            )
          : <CompatiblePeople peopleList={findCompatiblePeople.data as CompatiblePeopleInfo[]} compatibleSignsInfo={findCompatibleSigns.data as CompatibleSignsInfo[]} />
      }
    </div>
  );
};
