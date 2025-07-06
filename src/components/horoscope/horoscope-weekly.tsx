import type { TZodiacSigns } from "@/lib/custom.types";

import LoadingSpinner from "@/components/common/loading-spinner";
import { trpc } from "@/trpc/clitent";

import { Card, CardContent, CardHeader } from "../ui/card";
import { getIconFromSign } from "../zodiac-signs";

const HoroscopeWeekly = ({ sign }: { sign: string }) => {
  const query = trpc.horoscope.weekly.useQuery({ sign });
  if (query.isLoading) {
    return (
      <div
        className={
          "w-full py-16  mt-5 bg-white/10 border-white/20 backdrop-blur-lg rounded-md"
        }
      >
        <LoadingSpinner />
        <h2 className={"mt-16 text-2xl text-white font-bold text-center"}>
          Connecting to the Cosmos...
        </h2>
        <p className={"text-white/40 text-center"}>
          The stars are aligning your experience
        </p>
      </div>
    );
  }
  if (!query.data) {
    throw new Error("Error Fetching the horoscope data. Please try again.", {
      cause: {
        reason: "No Related Horoscope data.",
      },
    });
  }
  const SignIcon = getIconFromSign(sign as TZodiacSigns);
  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur-lg rounded-md mt-5">
      <CardHeader className={"flex items-center gap-x-4"}>
        <SignIcon
          fill={"gold"}
          className={"animate-pulse aspect-square size-10"}
        />
        <div>
          <h3 className={"text-xl text-cosmic-gold font-bold"}>{sign}</h3>
          <p className={"text-white/80"}>
            Cosmic Guidance through{" "}
            <span className={"font-bold text-cosmic-gold"}>
              {query.data.week}
            </span>
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className={"p-6 bg-white/10 rounded-lg text-white"}>
          <h4 className={"mb-3 font-bold text-lg"}>🔮 Prediction</h4>
          <p className={"text-white/80"}>{query.data.horoscope_data}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoroscopeWeekly;
