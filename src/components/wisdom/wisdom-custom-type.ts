export type StardustType = "Nebula" | "Glimmer" | "Lumen";

export type Quote = {
  id: string;
  content: string;
  createdAt: Date;
  username: string;
  userSign: string;
};

export type CreateQuote = {
  content: string;
};

export const STARDUST_EMOJIS: Record<string, string> = {
  Lumen: "🌞",
  Glimmer: "✨",
  Nebula: "🌌",
};

export const reactions = [
  {
    id: "lumen",
    label: "Lumen",
    color: "from-yellow-400 to-orange-500",
    emoji: "🌞",
  },
  {
    id: "glimmer",
    label: "Glimmer",
    color: "from-blue-400 to-blue-700",
    emoji: "✨",
  },
  {
    id: "nebula",
    label: "Nebula",
    color: "from-purple-500 to-indigo-700",
    emoji: "🌌",
  },
];

// This is animation variants for the reaction button
export const containerVariants = {
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

export const iconVariants = {
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

export const hoverVariants = {
  scale: 1.5,
  y: -5,
  transition: {
    type: "tween" as const,
    ease: "easeOut" as const,
    duration: 0.05,
  },
};
