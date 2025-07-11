import { Cookie, Flower, Loader2 } from "lucide-react";

import type { Gift } from "@/database/enums";

import { trpc } from "@/trpc/clitent";

import { Button } from "../ui/button";

const GiftButton = ({ recvId, type }: { recvId: string; type: Gift }) => {
  const giftButtonStats = trpc.gifts.giftButtonPreCheck.useQuery({ recieverId: recvId, giftType: type });

  const giftFunc = trpc.gifts.sendGift.useMutation({
    onSettled: () => { giftButtonStats.refetch(); },
  });

  const paint = (giftType: Gift) => {
    if (giftType === "Rose") {
      return `bg-rose-400 border-1 border-rose-500 hover:bg-rose-500`;
    }
    else if (giftType === "Fortune Cookie") {
      return `bg-amber-400 border-1 border-amber-500 hover:bg-amber-500`;
    }
  };

  const getIcon = (giftType: Gift) => {
    if (giftType === "Rose") {
      return <Flower />;
    }
    else if (giftType === "Fortune Cookie") {
      return <Cookie />;
    }
  };

  const giftFunction = () => {
    giftFunc.mutate({ recieverId: recvId, giftType: type, alreadySent: giftButtonStats.data?.giftAlreadySent });
  };

  if (giftButtonStats.isLoading || giftButtonStats.isFetching) {
    return (
      <Button size={"sm"} className={`${paint(type)} w-[52px]`}>
        <Loader2 className={"animate-spin"} />
      </Button>
    );
  }

  return (
    <Button size={"sm"} className={`${paint(type)}`} onClick={giftFunction}>
      {getIcon(type)} <span>{giftButtonStats.data?.giftCount}</span>
    </Button>
  );
};

export default GiftButton;
