import { Star } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const Nav = () => {
  return (
    <header className={"px-4 py-6 md:px-6  lg:px-10"}>
      <nav className={"flex items-center justify-between"}>
        <h1>
          <Link to={"/landing"} className={"flex items-center gap-x-1.5"}>
            <Star color={"gold"} />
            <span className={"font-bold text-xl text-white"}>Horonet</span>
          </Link>
        </h1>
        <Button
          asChild={true}
          className={"bg-gradient-to-r from-cosmic-purple to-cosmic-gold"}
        >
          <Link to={"/auth/sign-up"}>Get Started</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Nav;
