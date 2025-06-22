import { Sparkles } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className={"px-4 py-10  md:px-6 md:pt-20 md:pb-16  lg:px-10"}>
      <h2
        className={
          "max-w-[900px] mx-auto mb-4 text-4xl md:text-6xl lg:text-7xl  text-center  font-bold bg-gradient-to-r from-cosmic-gold via-cosmic-starlight to-cosmic-purple bg-clip-text text-transparent"
        }
      >
        <Sparkles
          className={"inline-block size-12 mr-4 md:size-16 lg:size-22"}
          color={"gold"}
        />
        <span>Discover Your Cosmic Destiny</span>
      </h2>
      <p
        className={
          "max-w-[800px] mx-auto text-center text-white/80 text-lg md:text-xl lg:text-2xl"
        }
      >
        Connect with the universe, find your perfect matches, and unlock the
        mysteries of the zodiac
      </p>
      <Button
        asChild={true}
        variant={"cosmic"}
        className={"w-fit mt-4 mx-auto block text-white"}
      >
        <Link to={"/auth/sign-up"} className={"flex items-center gap-x-1"}>
          <span>Start your journey</span>
          <Sparkles color={"gold"} />
        </Link>
      </Button>
    </section>
  );
};

export default Hero;
