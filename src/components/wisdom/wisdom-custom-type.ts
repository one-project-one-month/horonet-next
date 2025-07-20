export type StardustType = "Nebula" | "Glimmer" | "Lumen";

export type Quote = {
  id: string;
  content: string;
  createdAt: Date;
  username: string;
  userSign: string;
  stardustCounts: Partial<Record<StardustType, number>>;
};

export type CreateQuote = {
  content: string;
};
