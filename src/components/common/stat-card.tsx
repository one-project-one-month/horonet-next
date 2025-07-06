import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import TextLoading from "./text-loading";

type TStatProps = {
  main: number | string;
  text: string;
  icon?: ReactNode;
  mainStyle?: string;
  containerStyle?: string;
  isPending?: boolean;
};

export default function StatCard({ main, text, icon, mainStyle, containerStyle, isPending }: TStatProps) {
  return (
    <div className={cn("bg-background/10 backdrop-blur-xs p-3 w-full rounded-md flex items-center justify-center flex-col", containerStyle)}>
      <p className={cn("text-4xl font-bold [text-shadow:1px_1px_1px_#555] capitalize", mainStyle)}>
        {
          isPending ? <TextLoading /> : main
        }
      </p>
      <div className="flex items-center gap-1 opacity-60 mt-2">
        <span className="*:size-4">{icon}</span>
        <p className="text-xs sm:text-base capitalize">{text}</p>
      </div>
    </div>
  );
}
