import WiseWords from "@/components/compatibility/wise-words";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/clitent";

export const CompatibilityPage = () => {
  const getCurrentUserSign = trpc.compatibility.getCurrentUserSign.useQuery();

  if (getCurrentUserSign.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <WiseWords sign={getCurrentUserSign.data as string} />
      <Button className="mt-4" variant={"cosmic"}>Find companions</Button>
      {/*
          search results here
        */}
    </div>
  );
};
