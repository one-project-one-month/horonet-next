import { useEffect, useState } from "react";

import { zodiacSigns } from "@/lib/constants";
import { trpc } from "@/trpc/clitent";

import type { Quote } from "../wisdom/wisdom-custom-type";

import { Card } from "../ui/card";
import ReactionPanel from "../wisdom/reaction-panel";

// Later refactor this with wisdom-post.tsx and use the same component
export default function Quotes() {
  const quoteQuery = trpc.wisdom.getUserQuotes.useQuery();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (quoteQuery.data) {
      setQuotes(
        quoteQuery.data.map(q => ({
          ...q,
          createdAt: new Date(q.createdAt),
        })),
      );
    }
  }, [quoteQuery.data]);

  return (
    <section className="mt-5 px-5">
      <h1 className="text-cosmic-gold text-3xl font-bold mb-3">
        ✨ Your Cosmic Wisdom
      </h1>
      <div className="space-y-3">
        {quotes.map(quote => (
          <Card
            key={quote.id}
            className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-6"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="text-xl">
                {zodiacSigns[quote.userSign.toLowerCase()].symbol}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-cosmic-starlight">
                    {quote.username}
                  </span>
                  <span className="text-white/60 text-sm">
                    {quote.createdAt.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-white/90 leading-relaxed">{quote.content}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10">
              <ReactionPanel wisdomId={quote.id} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
