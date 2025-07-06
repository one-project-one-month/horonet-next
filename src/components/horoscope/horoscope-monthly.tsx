import { format } from "date-fns";
import { Calendar, Sparkle, TriangleAlert } from "lucide-react";

import type { TZodiacSigns } from "@/lib/custom.types";

import LoadingSpinner from "@/components/common/loading-spinner";
import { Card } from "@/components/ui/card";
import { getIconFromSign } from "@/components/zodiac-signs";
import { parseDateFromNum } from "@/lib/utils";
import { trpc } from "@/trpc/clitent";

import { Badge } from "../ui/badge";
import { CardContent, CardHeader } from "../ui/card";

const HoroscopeMonthly = ({ sign }: { sign: string }) => {
  const query = trpc.horoscope.monthly.useQuery({ sign });
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
            Cosmic Guidance for{" "}
            <span className={"font-bold text-cosmic-gold"}>
              {format(new Date(), "MMMM yyyy")}
            </span>
          </p>
        </div>
      </CardHeader>
      <CardContent className={"grid gap-6 lg:grid-cols-2"}>
        {/* Horoscope */}
        <div className={"p-6 bg-white/10 rounded-lg text-white lg:col-span-2"}>
          <h4 className={"mb-3 font-bold text-lg"}>🔮 Prediction</h4>
          <p className={"text-white/80"}>{query.data.horoscope_data}</p>
        </div>

        {/* Challenging Days */}
        <div className={"p-6 bg-white/10 rounded-lg text-white"}>
          <h4
            className={
              "font-bold text-lg text-red-400 flex items-center gap-x-4"
            }
          >
            <TriangleAlert />
            <span>Challenging Days</span>
          </h4>
          <div className={"py-5 flex items-center gap-x-3"}>
            {query.data.challenging_days.split(", ").map(item => (
              <Badge
                key={item}
                variant="outline"
                className="border-red-400/50 text-red-300 bg-red-400/10 hover:bg-red-400/20 text-sm"
              >
                <Calendar />
                <span>{parseDateFromNum(item)}</span>
              </Badge>
            ))}
          </div>
          <p className={"text-white/80"}>
            Cosmic energy might heighten emotions. Take extra care with
            decisions and avoid major commitments on those day.
          </p>

          <div className="mt-4 bg-red-400/50 p-3 rounded-lg">
            <p className="text-red-200 text-xs">
              💡 Tip: Practice mindfulness and stay grounded during these days.
              This too shall pass.
            </p>
          </div>
        </div>

        {/*  Standing Days */}
        <div className={"p-6 bg-white/10 rounded-lg text-white"}>
          <h4
            className={
              "font-bold text-lg text-cosmic-gold flex items-center gap-x-4"
            }
          >
            <Sparkle />
            <span>Standout Days</span>
          </h4>

          <div className={"py-5 flex items-center gap-x-3"}>
            {query.data.standout_days.split(", ").map(item => (
              <Badge
                key={item}
                variant="outline"
                className="border-cosmic-gold/50 text-cosmic-gold bg-cosmic-gold/10 hover:bg-cosmic-gold/20 text-sm"
              >
                <Calendar />
                <span>{parseDateFromNum(item)}</span>
              </Badge>
            ))}
          </div>

          <p className={"text-white/80"}>
            ✨ The stars are in your favor today. Cosmic energy amplifies your
            strengths — a perfect time for bold moves, heartfelt connections,
            and creative breakthroughs. Embrace the moment. Let your light
            shine.
          </p>
          <div className="mt-4 bg-cosmic-gold/40 p-3 rounded-lg">
            <p className="text-white/80 text-xs">
              ✨ Tip: Plan important meetings, dates, or launches on these days
              for maximum success.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoroscopeMonthly;
