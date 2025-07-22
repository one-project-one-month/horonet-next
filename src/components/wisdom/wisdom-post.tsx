import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { zodiacSigns } from "@/lib/constants";
import { trpc } from "@/trpc/clitent";

import type { Quote } from "./wisdom-custom-type";

import ReactionPanel from "./reaction-panel";

const WisdomPost = () => {
  const quoteQuery = trpc.wisdom.getAllWisdomWithStardustCounts.useQuery();
  const [newQuote, setNewQuote] = useState("");
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

  const createWisdom = trpc.wisdom.createWisdom.useMutation({
    onSuccess: () => {
      quoteQuery.refetch();
    },
  });

  const handleSubmitQuote = () => {
    if (newQuote.trim()) {
      createWisdom.mutate({ content: newQuote });
      setNewQuote("");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-6">
        <h3 className="text-lg font-semibold text-cosmic-gold mb-4">
          Share Your Cosmic Wisdom
        </h3>
        <Textarea
          value={newQuote}
          onChange={e => setNewQuote(e.target.value)}
          placeholder="What wisdom do the stars whisper to you today? ✨"
          className="bg-white/10 border-white/20 text-white placeholder-white/50 mb-4 resize-none"
          maxLength={280}
        />
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">
            {280 - newQuote.length} characters remaining
          </span>
          <Button
            onClick={handleSubmitQuote}
            disabled={!newQuote.trim()}
            className="cursor-pointer bg-gradient-to-r from-cosmic-purple to-cosmic-gold hover:from-cosmic-gold hover:to-cosmic-purple"
          >
            Share Wisdom
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-cosmic-gold">
          ✨ Cosmic Community
        </h3>
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
    </div>
  );
};

export default WisdomPost;
