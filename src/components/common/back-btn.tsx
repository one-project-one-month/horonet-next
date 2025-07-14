import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

export default function BackBtn() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="group bg-transparent hover:bg-background/10 px-3 cursor-pointer py-2 rounded-sm">
      <ArrowLeft className="inline mr-2 group-hover:-translate-x-1 transition" />
      Back
    </Button>
  );
}
