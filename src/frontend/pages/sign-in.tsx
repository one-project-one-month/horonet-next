import { Link } from "react-router";

import SignInForm from "@/components/auth/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignInPage = () => {
  return (
    <Card className="mx-6 w-full max-w-[450px] bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10  text-center">
      <CardHeader>
        <CardTitle
          className={
            "text-3xl bg-gradient-to-r from-cosmic-gold via-cosmic-starlight to-cosmic-purple bg-clip-text text-transparent"
          }
        >
          ✨ Join the Cosmos
        </CardTitle>
        <CardDescription className={"mt-4 text-white/70"}>
          Sign in into your account and continue your cosmic journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p className={"w-full text-center text-white/70"}>
          Don't Have An Account?{" "}
          <Link
            to={"/auth/sign-up"}
            className={"ml-2 text-cosmic-gold underline"}
          >
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInPage;
