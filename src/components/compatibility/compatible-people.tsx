import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import type { TZodiacSigns } from "@/lib/custom.types";

import type { CompatiblePeopleInfo, CompatibleSignsInfo } from "./compatibility-custom-types";

import { getIconFromSign } from "../svg-icons/zodiac-signs";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { BASE_SVG_PATH } from "./compatibility-constants";
import GiftButton from "./gift-button";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
      {compatiblePeople?.map((p) => {
        const SignIcon = getIconFromSign(p.sign as TZodiacSigns);
        return (
          <Card
            key={p.id}
            className="flex flex-col justify-between bg-gradient-to-br from-cosmic-deep-purple to-yellow-600 border border-background/20 rounded-xl
            lg:p-5 md:p-5 sm:p-5 py-5 px-2.5 shadow-md backdrop-blur-sm min-h-[220px]
            transition-all duration-200 ease-in-out space-y-3 hover:shadow-[0_0_20px_2px_rgba(255,215,0,0.4)]"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-base font-extrabold text-cosmic-starlight flex items-center gap-2">
                  {p.name}
                  <Image
                    src={`${BASE_SVG_PATH}/${p.gender}.svg`}
                    width={20}
                    height={20}
                    alt="gender"
                    className="inline-block"
                  />
                </h2>
                <p className="text-xs text-cosmic-starlight/80 font-medium mt-1">
                  Score: <span className="text-cosmic-gold font-semibold">{getScore(p.sign)}</span>
                </p>
              </div>
              <div className="rounded-full bg-gradient-to-r from-cosmic-gold via-cosmic-starlight to-cosmic-gold p-1 shadow-inner">
                <SignIcon className="h-7 w-7 fill-cosmic-deep-purple" />
              </div>
            </div>

            <div className="bg-white/20 text-cosmic-starlight font-bold text-sm text-center px-3 py-1 rounded-full border-cosmic-gold border-2 backdrop-blur-sm w-fit mx-auto mb-4 shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              {getChemistry(p.sign)}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
              <div className="flex justify-between gap-2 sm:gap-2 w-full sm:w-auto">
                <GiftButton recvId={p.id} type={"Rose"} />
                <GiftButton recvId={p.id} type={"Fortune Cookie"} />
              </div>

              <Button
                size="sm"
                asChild
                className="bg-gradient-to-tr from-cosmic-purple to-cosmic-gold text-xs sm:text-sm font-semibold sm:mx-0 mx-auto sm:w-auto"
              >
                <Link to={`/app/user/${p.id}`}>
                  View Profile
                </Link>
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CompatiblePeople;
