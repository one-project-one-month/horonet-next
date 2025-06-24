import type { User } from "better-auth";

import { useNavigate, useRouteLoaderData } from "react-router";

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
  const loader = useRouteLoaderData("root") as User;
  if (!loader) {
    return navigate("/landing");
  }
  const query = trpc.onboard.canOnboard.useQuery({ id: loader.id });
  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (query.data && !query.data.canOnboard) {
    return navigate("/landing");
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
