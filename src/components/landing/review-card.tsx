import { Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type ReviewCardProps = {
  userName: string;
  sign: string;
  content: string;
};
const ReviewCard = ({ userName, sign, content }: ReviewCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10  text-center">
      <CardHeader>
        <CardTitle className={"sr-only"}>Review by user {userName}</CardTitle>
        <div className={"flex items-center gap-x-1.5"}>
          <span className={"sr-only"}>Rating: 5 Stars</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={"size-5"} fill={"gold"} color={"gold"} />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className={"text-white/80"}>{content}</p>
        <p className={"mt-3 font-bold text-cosmic-gold"}>-{userName}, {sign}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
