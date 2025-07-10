import { useParams } from "react-router";

import { trpc } from "@/trpc/clitent";

import LoadingSpinner from "../common/loading-spinner";
import ErrorBoundary from "../layout/error-boundary";
import UserInfo from "./user-info";

export default function UserProfilePage() {
  const { userId } = useParams();

  const { data: isValidUserId, isPending } = trpc.getUserData.validateUserId.useQuery(userId || "");
  // console.log("Validation %s", isValidUserId);

  if (isPending) {
    return (
      <div className="h-[calc(100dvh-84px)] grid place-items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isValidUserId || !userId) {
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
