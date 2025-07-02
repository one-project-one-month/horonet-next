import { useState } from "react";

import CompatiblePeople from "@/components/compatibility/compatible-people";
import WiseWords from "@/components/compatibility/wise-words";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/clitent";

export const CompatibilityPage = () => {
  const [userLimit, setUserLimit] = useState<number>(10);

  const getCurrentUserSign = trpc.compatibility.getCurrentUserSign.useQuery();
  const findCompatibleSigns = trpc.compatibility.findCompatibleSigns.useQuery(getCurrentUserSign.data?.signId as string);
  const findCompatiblePeople = trpc.compatibility.findCompatiblePeople.useQuery({ sign: getCurrentUserSign.data?.signName as string, limit: userLimit }, { enabled: false });

  if (getCurrentUserSign.isLoading || findCompatibleSigns.isLoading) {
    return <div>Loading...</div>;
  }

  const decreaseUserLimit = () => {
    if (userLimit > 1) {
      setUserLimit(userLimit - 1);
    }
  };

  const increaseUserLimit = () => {
    setUserLimit(userLimit + 1);
  };
  // Testing
  console.log(findCompatibleSigns.data);

  return (
    <div className="text-center">
      <WiseWords sign={getCurrentUserSign.data?.signName as string} />
      {/* Refactor later */}
      <Button
        className="mt-4"
        variant={"cosmic"}
        onClick={() => {
          findCompatiblePeople.refetch();
          if (findCompatiblePeople.isLoading) {
            console.log("It's loading...");
          }
          console.log(findCompatiblePeople.data);
        }}
      >Find companions
      </Button>

      <div className="flex justify-center">
        <Button onClick={increaseUserLimit}>+</Button>
        {userLimit}
        <Button onClick={decreaseUserLimit}>-</Button>
      </div>
      <CompatiblePeople peopleList={[]} />
    </div>
  );
};
