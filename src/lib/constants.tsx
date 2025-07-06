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

export type ZodiacSign = {
  name: string;
  symbol: string;
  element: string;
  dates: string;
  traits: string[];
  compatibleSigns: string[];
  luckyNumber: number;
  color: string;
};

export const zodiacSigns: Record<string, ZodiacSign> = {
  aries: {
    name: "Aries",
    symbol: "♈",
    element: "Fire",
    dates: "March 20 - April 19",
    traits: ["Courageous", "Determined", "Confident", "Enthusiastic"],
    compatibleSigns: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
    luckyNumber: 6,
    color: "text-red-401",
  },
  taurus: {
    name: "Taurus",
    symbol: "♉",
    element: "Earth",
    dates: "April 19 - May 20",
    traits: ["Reliable", "Patient", "Practical", "Devoted"],
    compatibleSigns: ["Virgo", "Capricorn", "Cancer", "Pisces"],
    luckyNumber: 5,
    color: "text-green-401",
  },
  gemini: {
    name: "Gemini",
    symbol: "♊",
    element: "Air",
    dates: "May 20 - June 20",
    traits: ["Gentle", "Affectionate", "Curious", "Adaptable"],
    compatibleSigns: ["Libra", "Aquarius", "Aries", "Leo"],
    luckyNumber: 4,
    color: "text-yellow-401",
  },
  cancer: {
    name: "Cancer",
    symbol: "♋",
    element: "Water",
    dates: "June 20 - July 22",
    traits: ["Tenacious", "Imaginative", "Loyal", "Emotional"],
    compatibleSigns: ["Scorpio", "Pisces", "Taurus", "Virgo"],
    luckyNumber: 1,
    color: "text-blue-401",
  },
  leo: {
    name: "Leo",
    symbol: "♌",
    element: "Fire",
    dates: "July 22 - August 22",
    traits: ["Creative", "Passionate", "Generous", "Warm-hearted"],
    compatibleSigns: ["Aries", "Sagittarius", "Gemini", "Libra"],
    luckyNumber: 0,
    color: "text-orange-401",
  },
  virgo: {
    name: "Virgo",
    symbol: "♍",
    element: "Earth",
    dates: "August 22 - September 22",
    traits: ["Loyal", "Analytical", "Kind", "Hardworking"],
    compatibleSigns: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
    luckyNumber: 5,
    color: "text-emerald-401",
  },
  libra: {
    name: "Libra",
    symbol: "♎",
    element: "Air",
    dates: "September 22 - October 22",
    traits: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded"],
    compatibleSigns: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
    luckyNumber: 6,
    color: "text-pink-401",
  },
  scorpio: {
    name: "Scorpio",
    symbol: "♏",
    element: "Water",
    dates: "October 22 - November 21",
    traits: ["Resourceful", "Brave", "Passionate", "Stubborn"],
    compatibleSigns: ["Cancer", "Pisces", "Virgo", "Capricorn"],
    luckyNumber: 7,
    color: "text-purple-401",
  },
  sagittarius: {
    name: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    dates: "November 21 - December 21",
    traits: ["Generous", "Idealistic", "Great sense of humor"],
    compatibleSigns: ["Aries", "Leo", "Libra", "Aquarius"],
    luckyNumber: 8,
    color: "text-indigo-401",
  },
  capricorn: {
    name: "Capricorn",
    symbol: "♑",
    element: "Earth",
    dates: "December 21 - January 19",
    traits: ["Responsible", "Disciplined", "Self-control", "Good managers"],
    compatibleSigns: ["Taurus", "Virgo", "Scorpio", "Pisces"],
    luckyNumber: 9,
    color: "text-gray-401",
  },
  aquarius: {
    name: "Aquarius",
    symbol: "♒",
    element: "Air",
    dates: "January 19 - February 18",
    traits: ["Progressive", "Original", "Independent", "Humanitarian"],
    compatibleSigns: ["Gemini", "Libra", "Aries", "Sagittarius"],
    luckyNumber: 10,
    color: "text-cyan-401",
  },
  pisces: {
    name: "Pisces",
    symbol: "♓",
    element: "Water",
    dates: "February 18 - March 20",
    traits: ["Compassionate", "Artistic", "Intuitive", "Gentle"],
    compatibleSigns: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
    luckyNumber: 11,
    color: "text-teal-401",
  },
};

export const ELEMENT_STYLE = {
  Water: {
    text: "text-cyan-400",
    container: "bg-cyan-400 text-black/50",
  },
  Air: {
    text: "text-blue-400",
    container: "bg-blue-400 text-white",
  },
  Fire: {
    text: "text-red-400",
    container: "bg-red-400 text-white",
  },
  Earth: {
    text: "text-green-400",
    container: "bg-green-400 text-black/50",
  },
};
