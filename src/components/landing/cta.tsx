import { Link } from "react-router";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader } from "../ui/card";

const Cta = () => {
  return (
    <section className={"px-4 py-10  md:px-6 lg:px-20"}>
      <Card className=" max-w-[800px] mx-auto bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10  text-center">
        <CardHeader className={"text-3xl md:text-4xl font-bold text-white"}>
          Ready to Begin Your Cosmic Journey?
        </CardHeader>
        <CardContent>
          <p className={"text-white/60 text-xl"}>
            Join thousands of cosmic seekers and discover what the stars have in
            store for you
          </p>
          <Button
            asChild={true}
            variant={"cosmic"}
            className={"mt-4 text-white md:text-lg"}
          >
            <Link to={"/auth/sign-in"}>Join Now - It's Free!&nbsp; 🚀</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default Cta;
