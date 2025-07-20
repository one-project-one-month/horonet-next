import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const reactions = [
  { id: "lumen", label: "Lumen", color: "from-yellow-400 to-orange-500", emoji: "🌞" },
  { id: "glimmer", label: "Glimmer", color: "from-blue-400 to-blue-700", emoji: "✨" },
  { id: "nebula", label: "Nebula", color: "from-purple-500 to-indigo-700", emoji: "🌌" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween" as const,
      ease: "easeOut" as const,
      duration: 0.25,
      staggerChildren: 0.1, // slower ladder
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      type: "tween" as const,
      ease: "easeIn" as const,
      duration: 0.15,
    },
  },
};

const iconVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.3, ease: "easeOut" as const },
      y: { duration: 0.008, ease: "easeOut" as const },
    },
  },
};

const hoverVariants = {
  scale: 1.5,
  y: -5,
  transition: {
    type: "tween" as const,
    ease: "easeOut" as const,
    duration: 0.05,
  },
};

export default function ReactionButton() {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <button
        className={`px-4 py-2 rounded-full shadow transition-all duration-200 flex items-center gap-2 ${
          selectedReaction === null
            ? "bg-transparent text-white border border-white hover:bg-white hover:text-gray-800"
            : `bg-gradient-to-r ${reactions.find(r => r.id === selectedReaction)?.color} text-white hover:opacity-90 border-0`
        }`}
        onClick={() => setSelectedReaction(null)}
      >
        <span className="text-lg">{selectedReaction ? reactions.find(r => r.id === selectedReaction)?.emoji : "🌞"}</span>
        <span>{selectedReaction ? reactions.find(r => r.id === selectedReaction)?.label : "Lumen"}</span>
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
                className="relative flex flex-col items-center transition-transform group"
                onClick={() => setSelectedReaction(reaction.id)}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${reaction.color} rounded-full flex items-center justify-center text-2xl shadow-md`}
                >
                  {reaction.emoji}
                </div>

                {/* Tooltip label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 ease-out group-hover:translate-y-0 translate-y-1">
                  {reaction.label}
                  {/* Arrow */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
