import type { User } from "better-auth";

import { CookieIcon, Flower } from "lucide-react";
import React from "react";
import { useRouteLoaderData } from "react-router";

import type { TZodiacSigns } from "@/lib/custom.types";

import { trpc } from "@/trpc/clitent";

import BackBtn from "../common/back-btn";
import StatCard from "../common/stat-card";
import { getIconFromSign } from "../zodiac-signs";

export default function Info() {
  const session = useRouteLoaderData("root") as User;
  const { data: profileInfo, isSuccess, isPending } = trpc.getUserData.getProfileInfo.useQuery(session.id);
  if (!isSuccess || isPending) {
    return <p className="">Loading...</p>;
  }
  const SignIcon = getIconFromSign(profileInfo.sign as TZodiacSigns);

  return (
    <section className="p-5">
      <div className="mb-5">
        <BackBtn />
      </div>

      <div className="flex gap-2 bg-cosmic-purple/20 backdrop-blur-sm p-5 border-background/20 rounded-md border">
        <div className="shrink-0 flex flex-col px-1 md:px-5 ">
          <SignIcon className="size-20 fill-cosmic-gold float h-full" />
          <p className="font-medium text-center">{profileInfo.sign}</p>
        </div>

        <div className="w-full">
          <h1 className="text-cosmic-gold sm:text-3xl font-semibold text-2xl">{session.name}</h1>
          <p className="text-xl font-bold">{profileInfo.bio}</p>

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
        <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-3">
          <StatCard
            main={3}
            text="Quotes shared"
            containerStyle="p-5 border border-background/10"
            mainStyle="text-cosmic-gold"
            isPending={isPending}
          />
          <StatCard
            main={profileInfo.element}
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
