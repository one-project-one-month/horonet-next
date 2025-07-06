import { useParams } from "react-router";

import { trpc } from "@/trpc/clitent";

import PageLoading from "../common/page-loading";
import ErrorBoundary from "../layout/error-boundary";
import UserInfo from "./user-info";

export default function UserProfilePage() {
  const { userId } = useParams();

  const { data: isValidUserId, isPending } = trpc.getUserData.validateUserId.useQuery(userId || "");
  // console.log("Validation %s", isValidUserId);

  if (isPending) {
    return (
      <PageLoading />
    );
  }

  if (!isValidUserId || !userId) {
    return (
      <ErrorBoundary />
    );
  }

  return (
    <UserInfo userId={userId} />
  );
}
