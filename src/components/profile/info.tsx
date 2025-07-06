import type { TRPCClientErrorLike } from "@trpc/react-query";
import type { UseTRPCQueryResult } from "@trpc/react-query/shared";

import { CookieIcon, Flower } from "lucide-react";

import type { TPlanetSigns, TZodiacSigns } from "@/lib/custom.types";
import type { AppRouter } from "@/trpc/routers/_app";
import type { TUserData } from "@/trpc/routers/_profile";

import { zodiacSigns } from "@/lib/constants";

import BackBtn from "../common/back-btn";
import StatCard from "../common/stat-card";
import { getPlanetFromSign } from "../svg-icons/planet-signs";
import { getIconFromSign } from "../svg-icons/zodiac-signs";

type TData = UseTRPCQueryResult<TUserData, TRPCClientErrorLike<AppRouter>>;

export default function Info({ data }: { data: TData }) {
  const { data: profileInfo, isSuccess, isPending, isError } = data;
  const SignIcon = getIconFromSign(profileInfo?.sign as TZodiacSigns);
  const PlanetIcon = getPlanetFromSign(profileInfo?.planet as TPlanetSigns);

  if (isError) {
    return (
      <p className="w-5/6 mx-auto bg-red-500/5 border p-2 text-red-400 rounded-md border-red-500/10 flex items-center justify-center h-32">
        Failed to load profile data!
      </p>
    );
  }

  return (
    <section className="p-5">
      <div className="mb-5">
        <BackBtn />
      </div>

      <div className="flex gap-2 bg-cosmic-purple/20 backdrop-blur-sm p-5 border-background/20 rounded-md border">
        <div className="shrink-0 flex flex-col px-1 md:px-5 ">
          {isPending ? <div className="w-20 h-full bg-background/10 animate-pulse pt-5 pb-10 bg-clip-content" /> : <SignIcon className="size-20 fill-cosmic-gold float h-full" />}
          {
            isPending
              ? <div className="w-full h-10 bg-background/20 animate-pulse" />
              : (
                  <div className="">
                    <p className="font-medium"> {zodiacSigns[profileInfo.sign.toLowerCase()].symbol} {profileInfo.sign}</p>
                    <p title="Ruling Planet"> <span><PlanetIcon className="inline fill-cosmic-starlight size-4" />{profileInfo?.planet}</span></p>
                  </div>
                )
          }
        </div>

        <div className="w-full">
          <div className="space-y-1">
            {isPending ? <p className="bg-cosmic-gold/50 w-28 h-4 animate-pulse rounded-full mt-5" /> : <h1 className="text-cosmic-gold sm:text-4xl font-semibold text-2xl">{isSuccess && profileInfo.username}</h1>}
            {isPending ? <p className="bg-background/50 w-20 h-3 my-3 animate-pulse rounded-full" /> : <p className="font-medium text-cosmic-starlight">{isSuccess && profileInfo.bio}</p>}
            { isPending
              ? (
                  <span className="flex gap-1">
                    {Array.from({ length: 3 }, (_, i) => (
                      <span key={i} className="w-16 h-4 bg-cosmic-purple rounded-full animate-pulse" />
                    ))}
                  </span>
                )
              : profileInfo?.traits.map(trait => (
                  <span key={trait} className="bg-cosmic-purple px-2 py-0.5 rounded-full text-xs sm:text-sm mr-1 text-cosmic-starlight font-medium cursor-default">{trait}</span>
                ))}
          </div>

          <div className="flex gap-2 w-full mt-3">
            <StatCard
              main={23}
              text="Total Cookies"
              icon={<CookieIcon />}
              mainStyle="text-cosmic-gold"
              isPending={isPending}
            />
            <StatCard
              main={14}
              text="Total Roses"
              icon={<Flower />}
              mainStyle="text-rose-400"
              isPending={isPending}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
          <StatCard
            main={3}
            text="Quotes shared"
            containerStyle="p-5 border border-background/10"
            mainStyle="text-cosmic-gold"
            isPending={isPending}
          />
          <StatCard
            main={profileInfo?.element || ""}
            text="element"
            containerStyle="p-5 border border-background/10"
            isPending={isPending}
          />
          <StatCard
            main={7}
            text="Lucky Number"
            containerStyle="p-5 border border-background/10"
            mainStyle="text-green-400"
            isPending={isPending}
          />
        </div>
      </div>
    </section>
  );
}
