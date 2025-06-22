import { Link } from "react-router";

import SignUpForm from "@/components/auth/sign-up-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignUpPage = () => {
  return (
    <Card className="w-full max-w-[450px] bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10  text-center">
      <CardHeader>
        <CardTitle
          className={
            "text-3xl bg-gradient-to-r from-cosmic-gold via-cosmic-starlight to-cosmic-purple bg-clip-text text-transparent"
          }
        >
          ✨ Join the Cosmos
        </CardTitle>
        <CardDescription className={"mt-4 text-white/70"}>
          Create your account and discover your destiny
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p className={"w-full text-center text-white/70"}>
          Already Have An Account?{" "}
          <Link
            to={"/auth/sign-in"}
            className={"ml-2 text-cosmic-gold underline"}
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
