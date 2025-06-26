import { MessageCircleHeart, Sparkles, User, Users } from "lucide-react";

export const FEATURES = [
  {
    icon: "🔮",
    title: "Daily Horoscopes",
    content: "Get personalized cosmic insights and guidance for your day ahead",
    features: [
      "Personalized daily readings",
      "Love & career guidance",
      "Lucky numbers & colors",
    ],
  },
  {
    icon: "💫",
    title: "Cosmic Compatibility",
    content: "Find your perfect matches based on zodiac compatibility",
    features: [
      "Compatibility scores",
      "Friendship recommendations",
      "Relationship insights",
    ],
  },
  {
    icon: "✨",
    title: "Share Wisdom",
    content: "Connect with a community of cosmic seekers and share insights",
    features: [
      "Cosmic quote sharing",
      "Community discussions",
      "Spiritual growth",
    ],
  },
];

export const STATS = [
  {
    stats: "10K+",
    title: "Active Users",
  },
  { stats: "50K+", title: "Horoscopes Read" },
  { stats: "25K+", title: "Matches Made" },
  { stats: "99%", title: "Satisfaction" },
];

export const REVIEWS = [
  {
    userName: "LunaRay",
    sign: "Pisces",
    content:
      "I love starting my day with the horoscope feed. It's so dreamy and uplifting! 💫",
  },
  {
    userName: "StarBlazer21",
    sign: "Sagittarius",
    content:
      "The compatibility feature is 🔥! Matched with a Leo and we’ve been tossing roses all week 😍",
  },
  {
    userName: "VenusVibes",
    sign: "Taurus",
    content:
      "The vibe here is peaceful and cozy. I enjoy sending fortune cookies to my Virgo friends!",
  },
  {
    userName: "CosmicGem",
    sign: "Gemini",
    content:
      "The short quotes feature is amazing! It’s like Twitter but way more magical ✨",
  },
];

export const NAV_ITEMS_MOBILE = [
  {
    icon: <Sparkles />,
    path: "/app/horoscope",
    name: "Horoscope",
  },
  {
    icon: <MessageCircleHeart />,
    path: "/app/wisdom",
    name: "Wisdom",
  },
  {
    icon: <Users />,
    path: "/app/compatibility",
    name: "Compatibility",
  },
  {
    icon: <User />,
    path: "/app/user/profile",
    name: "Profile",
  },
];

export const NAV_ITEMS_LARGE = [
  {
    icon: <Sparkles />,
    path: "/app/horoscope",
    name: "Horoscope",
  },
  {
    icon: <MessageCircleHeart />,
    path: "/app/wisdom",
    name: "Wisdom",
  },
  {
    icon: <Users />,
    path: "/app/compatibility",
    name: "Compatibility",
  },
];
