import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { trpc } from "@/trpc/clitent";

import type {
  StardustType,
} from "./wisdom-custom-type";

import {
  containerVariants,
  hoverVariants,
  iconVariants,
  reactions,
  STARDUST_EMOJIS,
} from "./wisdom-custom-type";

// working for now , need to add a loading state for the reaction button and the reaction count
export default function ReactionPanel({ wisdomId }: { wisdomId: string }) {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const userReactionQuery = trpc.wisdom.getUserStardustReaction.useQuery(
    { wisdomId },
    { enabled: !!wisdomId },
  );
  const countsQuery = trpc.wisdom.getStardustCountsByWisdomId.useQuery(
    { wisdomId },
    { enabled: !!wisdomId },
  );

  useEffect(() => {
    if (userReactionQuery.data) {
      setSelectedReaction(
        userReactionQuery.data.stardustType?.toLocaleLowerCase() as StardustType,
      );
    }
  }, [userReactionQuery.data]);
  const reactMutation = trpc.wisdom.reactStardust.useMutation({
    onSuccess: (data) => {
      countsQuery.refetch();
      setSelectedReaction(
        data.action === "added" || data.action === "changed"
          ? (data.stardustType?.toLocaleLowerCase() as StardustType)
          : null,
      );
    },
  });
  const counts = countsQuery.data || {};
  const isLoading = reactMutation.isPending;

  return (
    <div className="flex items-center justify-between">
      {/* Reaction button */}
      <div
        className="relative inline-block"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        <button
          className={`px-4 py-2 cursor-pointer rounded-full shadow transition-all duration-200 flex items-center gap-2 ${
            selectedReaction === null
              ? "bg-transparent text-white border border-white hover:bg-white hover:text-gray-800"
              : `bg-gradient-to-r ${reactions.find(r => r.id === selectedReaction)?.color} text-white hover:opacity-90 border-0`
          }`}
          onClick={() =>
            reactMutation.mutate({
              wisdomId,
              stardustType: reactions.find(r => r.id === (selectedReaction ?? "lumen"))?.label as StardustType,
            })}
        >
          <span className="text-lg">
            {selectedReaction
              ? reactions.find(r => r.id === selectedReaction)?.emoji
              : "🌞"}
          </span>
          <span>
            {selectedReaction
              ? reactions.find(r => r.id === selectedReaction)?.label
              : "Lumen"}
          </span>
        </button>

        <AnimatePresence>
          {showReactions && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bottom-14  transform-translate-x-1/2 flex gap-4 bg-white px-4 py-2 rounded-xl shadow-lg"
            >
              {reactions.map(reaction => (
                <motion.button
                  key={reaction.id}
                  variants={iconVariants}
                  whileHover={hoverVariants}
                  transition={{
                    type: "tween" as const,
                    ease: "easeOut" as const,
                    duration: 0.05,
                  }}
                  className="relative cursor-pointer flex flex-col items-center transition-transform group"
                  disabled={reactMutation.isPending}
                  onClick={() =>
                    reactMutation.mutate({
                      wisdomId,
                      stardustType: reaction.label as StardustType,
                    })}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${reaction.color} rounded-full flex items-center justify-center text-2xl shadow-md`}
                  >
                    {reaction.emoji}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 ease-out group-hover:translate-y-0 translate-y-1">
                    {reaction.label}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Reaction count */}
      <div className="flex gap-3 items-center">
        {Object.entries(STARDUST_EMOJIS).map(([type, emoji]) => (
          <span key={type} className="flex items-center text-lg">
            {emoji}
            <span className="ml-1 text-base font-semibold">
              {isLoading
                ? "-"
                : counts[type] && counts[type]! > 0
                  ? counts[type]
                  : 0}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
