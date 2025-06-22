import { Wand } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

type FeatureCardProps = {
  icon: string;
  title: string;
  content: string;
  features: Array<string>;
};
const FeatureCard = ({ icon, title, content, features }: FeatureCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10  text-center">
      <CardHeader>
        <CardTitle
          className={"flex flex-col gap-y-4 text-2xl text-cosmic-gold"}
        >
          <span className={"text-5xl"}>{icon}</span>
          <span>{title}</span>
        </CardTitle>
        <CardContent>
          <p className={"text-white/60"}>{content}</p>
          <ul className={"mt-4 flex flex-col gap-y-2 md:gap-y-3 text-white/50"}>
            {features.map((feature, idx) => (
              <li
                key={idx}
                className={"flex items-center justify-center gap-x-3"}
              >
                <Wand color={"gold"} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;
