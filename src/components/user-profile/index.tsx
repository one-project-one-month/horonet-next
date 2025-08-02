import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useParams } from "react-router";

import { trpc } from "@/trpc/clitent";

import LoadingSpinner from "../common/loading-spinner";
import ErrorBoundary from "../layout/error-boundary";
import UserInfo from "./user-info";

export default function UserProfilePage() {
  const { userId } = useParams();
  const router = useRouter();

  const { data, isPending } = trpc.getUserData.validateUserId.useQuery(userId || "");
  // console.log("Validation", data?.isValidId);

  useEffect(() => {
    if (data?.isProfile) {
      router.replace("/app/user/profile");
    }
  }, [data?.isProfile, router]);

  if (isPending) {
    return (
      <div className="h-[calc(100dvh-84px)] grid place-items-center">
        <LoadingSpinner />
        <h2 className={"mt-16 text-2xl text-white font-bold text-center"}>
          Spiritually connecting...
        </h2>
      </div>
    );
  }

  if (!data?.isValidId || !userId) {
    return (
      <div className="h-[calc(100dvh-84px)] grid place-items-center">
        <ErrorBoundary />
      </div>
    );
  }

  return (
    <UserInfo userId={userId} />
  );
}
