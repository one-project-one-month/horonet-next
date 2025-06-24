import { Link, useNavigate, useSearchParams } from "react-router";

import SignCard from "@/components/onboarding/sign-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OnboardingSignPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const signId = searchParams.get("sid");
  if (!signId) {
    return navigate("/onboarding");
  }

  return (
    <section className={"w-full max-w-[500px]"}>
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10  text-center">
        <CardHeader>
          <CardTitle
            className={
              "text-3xl bg-gradient-to-r from-cosmic-gold via-cosmic-starlight to-cosmic-purple bg-clip-text text-transparent"
            }
          >
            🌟 Cosmic Connection
          </CardTitle>
          <CardDescription
            className={"max-w-[380px] mx-auto text-white/70 text-base"}
          >
            Discover your celestial destiny and connect with compatible souls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignCard id={signId} />
          <Button asChild={true} variant={"cosmic"} className={"block mt-4 text-white font-bold "}>
            <Link to={"/"}>Enter the Cosmic Realm</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default OnboardingSignPage;
