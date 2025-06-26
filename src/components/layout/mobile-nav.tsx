import { AlignJustify, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { NAV_ITEMS } from "@/lib/constants";

import { Button } from "../ui/button";

const MobileNav = () => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <Button className={"md:hidden"} variant={"cosmic"}>
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent className={"bg-[#1e1b4b] border-l-0"}>
        <SheetHeader className={"sr-only"}>
          <SheetTitle>Mobile nav</SheetTitle>
          <SheetDescription>
            Mobile Nav for rich user experience
          </SheetDescription>
        </SheetHeader>
        <ul className={"h-full py-20 px-8 flex flex-col gap-y-4"}>
          {NAV_ITEMS.map(item => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={
                  "flex items-center gap-x-3 px-6 py-4 rounded-lg  bg-cosmic-gold font-bold"
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          <Button
            asChild={true}
            variant={"destructive"}
            onClick={async () => {
              await authClient.signOut();
              return navigate("/landing");
            }}
          >
            <li className={"mt-auto flex items-center gap-x-2"}>
              <LogOut />
              <span>Logout</span>
            </li>
          </Button>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
