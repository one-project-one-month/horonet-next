import type { TRPCClientErrorLike } from "@trpc/react-query";
import type { UseTRPCQueryResult } from "@trpc/react-query/shared";

import { CookieIcon, Flower } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import type { TPlanetSigns, TZodiacSigns } from "@/lib/custom.types";
import type { AppRouter } from "@/trpc/routers/_app";
import type { TStats, TUserData } from "@/trpc/routers/_profile";

import { zodiacSigns } from "@/lib/constants";

import BackBtn from "../common/back-btn";
import StatCard from "../common/stat-card";
import GiftButton from "../compatibility/gift-button";
import { getPlanetFromSign } from "../svg-icons/planet-signs";
import { getIconFromSign } from "../svg-icons/zodiac-signs";

type TData = UseTRPCQueryResult<TUserData, TRPCClientErrorLike<AppRouter>>;

export default function Info({ data, stats }: { data: TData; stats?: TStats }) {
  const { data: profileInfo, isPending, isError } = data;
  const SignIcon = getIconFromSign(profileInfo?.sign as TZodiacSigns);
  const PlanetIcon = getPlanetFromSign(profileInfo?.planet as TPlanetSigns);
  const profileId = usePathname().split("/").pop()!;

  if (isError) {
    return (
      <p className="w-5/6 mx-auto bg-red-500/5 border p-2 text-red-400 rounded-md border-red-500/10 flex items-center justify-center h-32">
        Failed to load profile data!
      </p>
    );
  }

  return (
    <section className="p-2 sm:p-3 md:p-5">
      <div className="mb-5">
        <BackBtn />
      </div>

      <div className="flex gap-2 sm:gap-5 lg:gap-7 bg-cosmic-purple/20 backdrop-blur-sm border-background/20 rounded-md border p-5 md:px-7 lg:px-10">
        <div className="shrink-0 flex flex-col px-1 sm:px-5 md:px-7 lg:px-10 ">
          {
            isPending
              ? <div className="w-20 h-full bg-background/10 animate-pulse pt-5 pb-10 bg-clip-content" />
              : <SignIcon className="size-20 fill-cosmic-gold float h-full" />
          }
          {
            isPending
              ? <div className="w-full h-10 bg-background/20 animate-pulse" />
              : (
                  <div className="space-y-1">
                    <p className="font-medium"> {zodiacSigns[profileInfo.sign.toLowerCase()].symbol} {profileInfo.sign}</p>
                    <p className="flex items-center gap-1">
                      <PlanetIcon className=" fill-cosmic-starlight size-4" />
                      <span>{profileInfo.planet}</span>
                    </p>
                  </div>
                )
          }
        </div>

        <div className="w-full">
          <div className="space-y-1">
            {
              isPending
                ? <p className="bg-cosmic-gold/50 w-28 h-4 animate-pulse rounded-full mt-5" />
                : (
                    <h1 className="text-cosmic-gold sm:text-4xl font-semibold text-2xl flex items-center">
                      {profileInfo.username}
                      <Image className="-mb-1.5 -ml-" src={`/assets/icons/compatibility-icons/${profileInfo.gender.toUpperCase()}.svg`} width={26} height={26} alt={`gender ${profileInfo.gender}`} title={profileInfo.gender} />
                    </h1>
                  )
            }
            {
              isPending
                ? <p className="bg-background/50 w-20 h-3 my-3 animate-pulse rounded-full" />
                : <p className="font-medium text-cosmic-starlight">{profileInfo.bio}</p>
            }
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

          {
            profileId === "profile"
              ? (
                  <div className="flex gap-2 w-full mt-3">
                    <StatCard
                      main={stats?.find(stat => stat.gift === "Fortune Cookie")?.count || 0}
                      text="Total Cookies"
                      icon={<CookieIcon />}
                      mainStyle="text-cosmic-gold"
                      isPending={isPending}
                    />
                    <StatCard
                      main={stats?.find(stat => stat.gift === "Rose")?.count || 0}
                      text="Total Roses"
                      icon={<Flower />}
                      mainStyle="text-rose-400"
                      isPending={isPending}
                    />
                  </div>
                )
              : (
                  <div className="grid grid-cols-2 gap-2 w-full mt-3 h-[84px] md:h-24">
                    <div title="Gift Fortune Cookie" className="size-full rounded-sm self-stretch relative">
                      <GiftButton recvId={profileId} type="Fortune Cookie" style="size-full text-2xl flex items-center pb-5" />
                      <p className="absolute pointer-events-none select-none bottom-2 left-0 right-0 text-center text-sm">Total Cookies</p>
                    </div>
                    <div title="Gift Rose" className="size-full rounded-sm self-stretch relative">
                      <GiftButton recvId={profileId} type="Rose" style="size-full text-2xl flex items-center pb-5" />
                      <p className="absolute pointer-events-none select-none bottom-2 left-0 right-0 text-center text-sm">Total Roses</p>
                    </div>
                  </div>
                )
          }
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
            main={isPending ? "" : zodiacSigns[profileInfo.sign.toLowerCase()].luckyNumber}
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
