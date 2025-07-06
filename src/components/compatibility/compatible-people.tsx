import { CookieIcon, Flower } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import type { TZodiacSigns } from "@/lib/custom.types";

import type { CompatiblePeopleInfo, CompatibleSignsInfo } from "./compatibility-custom-types";

import { getIconFromSign } from "../svg-icons/zodiac-signs";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { BASE_SVG_PATH } from "./compatibility-constants";

const CompatiblePeople = ({ peopleList, compatibleSignsInfo }: { peopleList: CompatiblePeopleInfo[]; compatibleSignsInfo: CompatibleSignsInfo[] }) => {
  const [compatiblePeople, setCompatiblePeople] = useState<CompatiblePeopleInfo[]>([]);

  useEffect(() => {
    setCompatiblePeople(peopleList);
  }, [peopleList]);

  const getChemistry = (sign: string): string => {
    return compatibleSignsInfo?.filter((e) => {
      return e.compatibleSignName === sign;
    })[0].chemistry;
  };

  const getScore = (sign: string): number => {
    return compatibleSignsInfo?.filter((e) => {
      return e.compatibleSignName === sign;
    })[0].score;
  };

  const filterCompatiblePeople = (sign: string) => {
    setCompatiblePeople(peopleList.filter((p) => {
      return p.sign === sign;
    }));
  };

  const resetCompatiblePeopleFilter = () => {
    setCompatiblePeople(peopleList);
  };

  return (
    <div>
      {compatiblePeople
        ? (
            <div className="container w-2/4 mx-auto">
              <div className="flex justify-center gap-3">
                {
                  compatibleSignsInfo
                  && (
                    <Button onClick={resetCompatiblePeopleFilter} className="text-yellow-300">
                      <h4 className="object-contain w-full h-full">All</h4>
                    </Button>
                  )
                }
                {
                  compatibleSignsInfo && compatibleSignsInfo.map((s) => {
                    return (
                      <Button key={s.compatibleSignId} onClick={() => { filterCompatiblePeople(s.compatibleSignName); }}>
                        <Image src={`${BASE_SVG_PATH}/${s.compatibleSignName}.svg`} alt={`${s.compatibleSignName}.svg`} className="object-contain w-full h-full" width={50} height={50} />
                      </Button>
                    );
                  })
                }
              </div>

              <div className="flex justify-center mt-4">
                <ScrollArea className="border-background/50 px-1.5 min-w-[25rem] lg:min-w-[50rem] md:min-w-[50rem] sm:min-w-[50rem] rounded-md border">
                  {
                    compatiblePeople.length > 0

                      ? compatiblePeople.map((p) => {
                          const SignIcon = getIconFromSign(p.sign as TZodiacSigns);
                          return (
                            <div key={p.id} className="flex flex-col bg-cosmic-purple backdrop-blur-sm border-background/20 rounded-md border mt-2.5 mb-2.5 text-xs sm:text-[16px] md:text-[16px] lg:text-[16px]">
                              <div className="flex justify-between p-2">
                                <div className="flex flex-col">
                                  <h1 className="flex font-bold mb-1 text-sm sm:text-[16px] md:text-[16px] lg:text-[16px]">
                                    {p.name}
                                    <Image src={`${BASE_SVG_PATH}/${p.gender}.svg`} alt="gender.svg" width={25} height={25} className="object-contain" />
                                  </h1>
                                  <SignIcon className="size-10 fill-cosmic-deep-purple p-1 h-full rounded-full bg-gradient-to-r from-cosmic-gold via-cosmic-starlight to-cosmic-gold" />
                                </div>
                                <h3>
                                  Score: {getScore(p.sign)}
                                </h3>
                              </div>
                              <div className="flex flex-col text-center mb-6">
                                <h3>Chemistry: {getChemistry(p.sign)}</h3>
                              </div>
                              <div className="flex justify-between px-2 py-2">
                                <Button className="bg-rose-400 border-1 border-rose-500 hover:bg-rose-500">
                                  <Flower />
                                </Button>
                                <Button className="bg-gradient-to-r from-cosmic-deep-purple via-cosmic-gold to-cosmic-starlight">
                                  <span>View Profile</span>
                                </Button>
                                <Button className="bg-amber-400 border-1 border-amber-500 hover:bg-amber-500">
                                  <CookieIcon />
                                </Button>
                              </div>
                            </div>
                          );
                        })
                      : (
                          <div>
                            Found none.
                          </div>
                        )
                  }
                </ScrollArea>
              </div>
            </div>
          )
        : (
            <div>
              There's nothing here yet.
            </div>
          )}
    </div>
  );
};

export default CompatiblePeople;
