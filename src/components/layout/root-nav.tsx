import { Star } from "lucide-react";
import { Link } from "react-router";

import MobileNav from "@/components/layout/mobile-nav";

const RootNav = () => {
  return (
    <header className={"px-4 py-6 md:px-6  lg:px-10"}>
      <div className={"flex items-center justify-between"}>
        <h1>
          <Link to={"/app/horoscope"} className={"flex items-center gap-x-1.5"}>
            <Star color={"gold"} />
            <span className={"font-bold text-xl text-white"}>Horonet</span>
          </Link>
        </h1>
        <nav className={"max-sm:hidden"}></nav>
        <MobileNav />
      </div>
    </header>
  );
};

export default RootNav;
