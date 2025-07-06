import type { TZodiacSigns } from "@/lib/custom.types";

import LoadingSpinner from "@/components/common/loading-spinner";
import { getIconFromSign } from "@/components/svg-icons/zodiac-signs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ELEMENT_STYLE } from "@/lib/constants";
import { cn, parseToDate } from "@/lib/utils";
import { trpc } from "@/trpc/clitent";

const SignCard = ({ id }: { id: string }) => {
  const query = trpc.sign.selectById.useQuery({ id });
  if (!query.data || query.isLoading) {
    return (
      <Skeleton
        className={
          "bg-white/10 w-full h-[200px] flex justify-center items-center"
        }
      >
        <LoadingSpinner />
      </Skeleton>
    );
  }
  const SignIcon = getIconFromSign(query.data.name as TZodiacSigns);
  return (
    <div>
      <div className={"mb-5"}>
        <SignIcon fill={"gold"} className={"animate-pulse mx-auto mb-4"} />
        <h3 className={"text-2xl text-cosmic-gold font-bold"}>
          You are a {query.data.name}!
        </h3>
        <p className={"mt-2 tex-lg font-normal text-white"}>
          {parseToDate(query.data.periodStart)} -{" "}
          {parseToDate(query.data.periodEnd)}
        </p>
      </div>
      <div className={"p-8 bg-white/10 rounded-lg text-white"}>
        <ul className={"flex flex-col gap-y-3"}>
          <li className={"flex items-center justify-between"}>
            <span className={"text-white/60"}>Element:</span>
            <span
              className={cn(
                "font-bold text-lg",
                ELEMENT_STYLE[query.data.element].text,
              )}
            >
              {query.data.element}
            </span>
          </li>
          <li className={"flex items-center justify-between"}>
            <span className={"text-white/60"}>Ruling Planet:</span>
            <span className={"font-bold text-lg"}>
              {query.data.rulingPlanet}
            </span>
          </li>
        </ul>
        <div className={"mt-4"}>
          <p className={"text-center text-white/60"}>Your traits:</p>
          <div className={"mt-3 flex items-center justify-start gap-x-3"}>
            {query.data.traits.map(trait => (
              <Badge
                key={trait}
                className={cn(
                  "text-xs rounded-xl",
                  ELEMENT_STYLE[query.data.element].container,
                )}
              >
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignCard;
