import type { ReactNode } from "react";

import { CircleX, Home } from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";

const ErrorBoundaryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className={"relative w-screen h-screen flex items-center justify-center"}
    >
      {children}
    </section>
  );
};

const ErrorCard = ({
  message,
  description,
}: {
  message: string;
  description: string;
}) => {
  return (
    <Card
      className={
        "w-full max-w-[400px] bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6  text-center text-white"
      }
    >
      <CardHeader>
        <CardTitle>
          <CircleX
            className={"size-12 font-bold text-red-500 block mx-auto mb-4"}
          />
          <h1 className={"text-lg font-bold md:text-xl"}>Error: {message}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={"text-white/60"}>{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild={true}
          variant={"outline"}
          className={
            "w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white/50 flex items-center gap-2 justify-center"
          }
        >
          <Link to={"/app/horoscope"}>
            <Home /> <span>Return to home</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const ErrorBoundary = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorBoundaryLayout>
        <ErrorCard
          message={`${error.status} ${error.statusText}`}
          description={error.data}
        />
      </ErrorBoundaryLayout>
    );
  }
  else if (error instanceof Error) {
    return (
      <ErrorBoundaryLayout>
        <ErrorCard
          // @ts-expect-error This type is correct
          message={error.cause?.reason ?? error.name}
          description={error.message}
        />
      </ErrorBoundaryLayout>
    );
  }
  else {
    return (
      <ErrorBoundaryLayout>
        <ErrorCard
          message={"Unknown Error"}
          description={"We'll further investigate about this error"}
        />
      </ErrorBoundaryLayout>
    );
  }
};

export default ErrorBoundary;
