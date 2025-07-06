import type { TZodiacSigns } from "@/lib/custom.types";

import LoadingSpinner from "@/components/common/loading-spinner";
import { getIconFromSign } from "@/components/zodiac-signs";
import { trpc } from "@/trpc/clitent";

import { Card, CardContent, CardHeader } from "../ui/card";

const HoroscopeDaily = ({ sign }: { sign: string }) => {
  const query = trpc.horoscope.daily.useQuery({ sign });
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
          <p className={"text-white/80"}>Today's Cosmic Guidance</p>
        </div>
      </CardHeader>
      <CardContent className={"grid gap-4 text-white lg:grid-cols-2"}>
        <div className={"p-6 bg-white/10 rounded-lg"}>
          <h4 className={"mb-3 font-bold text-lg"}>💕 Love</h4>
          <p className={"text-white/80"}>
            Communication is key today - express your feelings openly.
          </p>
        </div>
        <div className={"p-6 bg-white/10 rounded-lg"}>
          <h4 className={"mb-3 font-bold text-lg"}>🌙 Mood</h4>
          <p className={"text-white/80"}>
            Curious and playful, ready for new adventures.
          </p>
        </div>
        <div className={"p-6 bg-white/10 rounded-lg lg:col-span-2"}>
          <h4 className={"mb-3 font-bold text-lg"}>🔮 Prediction</h4>
          <p className={"text-white/80"}>{query.data.horoscope_data}</p>
        </div>
        <div className={"p-6 bg-white/10 rounded-lg"}>
          <h4 className={"mb-3 font-bold text-lg"}>⏰ Lucky Time</h4>
          <p className={"text-white/80"}>10:00 AM - 12:00 PM</p>
        </div>
        <div className={"p-6 bg-white/10 rounded-lg"}>
          <h4 className={"mb-3 font-bold text-lg"}>🍀 Lucky Number</h4>
          <p className={"text-white/80"}>5</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoroscopeDaily;
