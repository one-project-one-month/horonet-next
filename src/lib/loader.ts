import type { LoaderFunction } from "react-router";

import { redirect } from "react-router";

import { authClient } from "@/lib/auth-client";

export const authLoader: LoaderFunction = async ({ request }) => {
  const url = request.url;
  if (url.includes("/landing")) {
    return;
  }
  const session = await authClient.getSession();
  if (!session.data) {
    return redirect("/landing");
  }
  return session.data.user;
};
