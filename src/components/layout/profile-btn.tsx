import { PopoverClose } from "@radix-ui/react-popover";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth-client";

const ProfileBtn = () => {
  const navigate = useNavigate();
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <li
          className={
            "aspect-square w-10 rounded-full flex justify-center items-center bg-cosmic-gold cursor-pointer"
          }
        >
          <User />
        </li>
      </PopoverTrigger>
      <PopoverContent className={"w-fit mt-2 mr-8 bg-[#1e1b4b] border-0"}>
        <div className={"flex flex-col gap-y-2"}>
          <PopoverClose asChild>
            <Button asChild={true} className={"max-w-[150px] bg-cosmic-gold"}>
              <Link
                to={"/app/user/profile"}
                className={"flex items-center gap-x-1.5"}
              >
                <User />
                <span>Profile</span>
              </Link>
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              asChild={true}
              variant={"destructive"}
              className={"max-w-[150px]"}
              onClick={async () => {
                await authClient.signOut();
                navigate("/landing");
              }}
            >
              <div className={"flex items-center gap-x-1.5 cursor-pointer"}>
                <LogOut />
                <span>Logout</span>
              </div>
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileBtn;
