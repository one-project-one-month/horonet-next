import { Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "react-router";

import MobileNav from "@/components/layout/mobile-nav";
import ProfileBtn from "@/components/layout/profile-btn";
import { NAV_ITEMS_LARGE } from "@/lib/constants";

const RootNav = () => {
  const path = usePathname();
  console.log(path);
  return (
    <header className={"px-4 py-6 md:px-6  lg:px-10"}>
      <div className={"flex items-center justify-between"}>
        <h1>
          <Link to={"/app/horoscope"} className={"flex items-center gap-x-1.5"}>
            <Star color={"gold"} />
            <span className={"font-bold text-xl text-white"}>Horonet</span>
          </Link>
        </h1>
        <nav className={"max-sm:hidden"}>
          <ul className={"flex items-center gap-x-14 lg:gap-x-20"}>
            {NAV_ITEMS_LARGE.map(item => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={"relative pb-2 flex items-center gap-x-2"}
                >
                  {item.icon} <span>{item.name}</span>
                  {path === item.path && (
                    <span
                      className={
                        "absolute w-[110%] h-1 -bottom-1 left-1/2 -translate-x-1/2 rounded-lg bg-cosmic-gold"
                      }
                    />
                  )}
                </Link>
              </li>
            ))}
            <ProfileBtn />
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
};

export default RootNav;
