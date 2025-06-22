import type { LoaderFunction } from "react-router";

import { authClient } from "@/lib/auth-client";

export const authLoader: LoaderFunction = async () => {
  const session = await authClient.getSession();
  console.log("session: ", session.data);
};
