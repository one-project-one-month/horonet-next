import React from "react";

import type { CompatiblePeopleInfo } from "./compatibility-custom-types";

import { ScrollArea } from "../ui/scroll-area";

const CompatiblePeople = ({ peopleList }: { peopleList: CompatiblePeopleInfo[] }) => {
  return (
    <ScrollArea className="">
      {peopleList && peopleList.map((p) => {
        return (
          <h1 key={p.id}>
            {p.name}
          </h1>
        );
      })}
    </ScrollArea>
  );
};

export default CompatiblePeople;
