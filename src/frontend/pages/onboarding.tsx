import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import OnboardingForm from "@/components/onboarding/onboarding-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/trpc/clitent";

const OnboardingPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid") as string;
  const query = trpc.onboard.canOnboard.useQuery({ id: uid });

  useEffect(() => {
    if (query.data && !query.data.canOnboard) {
      navigate("/landing");
    }
  }, [query.data, navigate]);

  if (query.isLoading) {
    return <div>Loading...</div>;
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
            Tell us about yourself to begin your celestial journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default OnboardingPage;
