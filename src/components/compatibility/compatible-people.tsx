import { CookieIcon, Flower } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import type { TZodiacSigns } from "@/lib/custom.types";

import type { CompatiblePeopleInfo, CompatibleSignsInfo } from "./compatibility-custom-types";

import { getIconFromSign } from "../svg-icons/zodiac-signs";
import { Button } from "../ui/button";
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

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
      {
        compatiblePeople && compatiblePeople.length > 0 && compatiblePeople.map((p) => {
          const SignIcon = getIconFromSign(p.sign as TZodiacSigns);
          return (
            <div key={p.id} className="flex flex-col bg-cosmic-purple backdrop-blur-sm border-background/20 rounded-md border mt-2.5 mb-2.5 text-xs sm:text-[14px] md:text-[14px] lg:text-[14px]">
              <div className="flex justify-between p-2">
                <div>
                  <h1 className="flex font-extrabold mb-1 text-sm sm:text-[16px] md:text-[16px] lg:text-[16px] text-cosmic-starlight">
                    {p.name}
                    <Image src={`${BASE_SVG_PATH}/${p.gender}.svg`} alt="gender.svg" width={22} height={22} className="object-contain" />
                  </h1>
                  <SignIcon className="size-10 fill-cosmic-deep-purple p-1 bg-gradient-to-r rounded-full from-cosmic-gold via-cosmic-starlight to-cosmic-gold" />
                </div>
                <h3 className="text-cosmic-starlight font-bold">
                  Score: {getScore(p.sign)}
                </h3>
              </div>
              <h3 className="bg-white/30 rounded-md w-fit mx-auto py-1 px-2 mb-2 font-bold text-cosmic-starlight">{getChemistry(p.sign)}</h3>
              <div className="flex justify-between px-2 py-2">
                <Button size={"sm"} className="bg-rose-300 border-1 border-rose-400 hover:bg-rose-400">
                  <Flower />
                </Button>
                <Button size={"sm"} className="bg-gradient-to-r from-cosmic-deep-purple via-cosmic-gold to-cosmic-starlight text-xs sm:text-[14px] md:text-[14px] lg:text-[14px]">
                  <span>View Profile</span>
                </Button>
                <Button size={"sm"} className="bg-amber-400 border-1 border-amber-500 hover:bg-amber-500">
                  <CookieIcon />
                </Button>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default CompatiblePeople;
