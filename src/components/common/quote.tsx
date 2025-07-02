import { Cookie, Flower } from "lucide-react";
import React from "react";

import type { TZodiacSigns } from "@/lib/custom.types";

import { getIconFromSign } from "../zodiac-signs";

type TQuoteProps = {
  name: string;
  date: Date;
  sign: TZodiacSigns;
  quote: string;
  totalCookie: number;
  totalRose: number;
};

export default function Quote({ name, date, sign, quote, totalCookie, totalRose }: TQuoteProps) {
  return (
    <div className="px-3 py-5 bg-cosmic-purple/30 backdrop-blur-xs rounded-md border-cosmic-purple border">
      <div className="flex gap-2 md:gap-3">
        <div className="text-3xl shrink-0 self-start">
          {
            React.createElement(getIconFromSign(sign), { className: "size-8 bg-cosmic-gold rounded-full p-1" })
          }
          {/* <Scorpio className="size-8 bg-cosmic-gold rounded-full p-1" /> */}
        </div>
        <div className="">
          <h1 className="text-lg font-bold w-max inline-block">{name}</h1>
          <span className="ml-3 text-sm opacity-70 select-none">{date.toLocaleDateString()}</span>
          <p>{quote}</p>
        </div>
      </div>

      <div className="px-3 border-t border-background/10 mt-7">
        <div className="flex gap-5 pt-3">
          <button type="button" className="flex items-center gap-1 cursor-pointer"><Cookie className="inline size-4" />{totalCookie}</button>
          <button type="button" className="flex items-center gap-1 cursor-pointer"><Flower className="inline size-4" />{totalRose}</button>
        </div>
      </div>
    </div>
  );
}
