import type { ClassValue } from "clsx";

import { Cookie, Flower, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import type { Gift } from "@/database/enums";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/clitent";

import { Button } from "../ui/button";

const GiftButton = ({ recvId, type, style }: { recvId: string; type: Gift; style?: ClassValue }) => {
  const giftButtonStats = trpc.gifts.giftButtonPreCheck.useQuery({ recieverId: recvId, giftType: type });
  const giftFunc = trpc.gifts.sendGift.useMutation({
    onSettled: () => { giftButtonStats.refetch(); },
  });

  const [giftCountState, setGiftCountState] = useState<number>(0);
  const [giftButtonLock, setGiftButtonLock] = useState<boolean>(false);
  const [giftAlreadySentState, setGiftAlreadySentState] = useState<boolean>(false);

  useEffect(() => {
    if (giftButtonStats.isSuccess) {
      setGiftCountState(giftButtonStats.data.giftCount);
      setGiftAlreadySentState(giftButtonStats.data.giftAlreadySent);
      // Release lock
      setGiftButtonLock(false);
    }
  }, [giftButtonStats.isLoading, giftButtonStats.data]);

  const paint = (giftType: Gift) => {
    if (giftType === "Rose") {
      return `${giftAlreadySentState ? `bg-[#B94786]` : `bg-[#CC5A9A]`} border-1 border-[#B94786] rounded-[14px] hover:bg-[#B94786] shadow-[0_0_20px_2px_rgba(204,90,154,0.35)]`;
    }
    else if (giftType === "Fortune Cookie") {
      return `${giftAlreadySentState ? `bg-[#A77448]` : `bg-[#BD8C57]`} border-1 border-[#A77448] rounded-[14px] hover:bg-[#A77448] shadow-[0_0_20px_2px_rgba(189,140,87,0.35)]
`;
    }
  };

  const getIcon = (giftType: Gift) => {
    if (giftType === "Rose") {
      return <Flower className={`${giftButtonLock ? `animate-spin` : ``}`} />;
    }
    else if (giftType === "Fortune Cookie") {
      return <Cookie className={`${giftButtonLock ? `animate-bounce` : ``}`} />;
    }
  };

  const giftFunction = () => {
    if (!giftButtonLock) {
      // Make UI responsive (Temporary values before useStates sync to tRPC)
      if (giftCountState !== undefined) {
        giftAlreadySentState ? setGiftCountState(giftCountState - 1) : setGiftCountState(giftCountState + 1);
        setGiftAlreadySentState(!giftAlreadySentState);
      }
      // Lock to disable, while server is responding
      setGiftButtonLock(true);

      giftFunc.mutate({ recieverId: recvId, giftType: type, alreadySent: giftButtonStats.data?.giftAlreadySent });
    }
  };

  if (!giftCountState && giftButtonStats.isLoading) {
    return (
      <Button size={"sm"} className={cn(`${paint(type)} w-[52px]`, style)}>
        <Loader2 className={"animate-spin"} />
      </Button>
    );
  }

  return (
    <Button size={"sm"} className={cn(paint(type), style)} onClick={giftFunction}>
      {getIcon(type)} <span>{giftCountState}</span>
    </Button>
  );
};

export default GiftButton;
