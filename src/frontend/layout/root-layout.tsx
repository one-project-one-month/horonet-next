import { Outlet } from "react-router";

import CosmicStar from "@/components/layout/cosmic-star";

const RootLayout = () => {
  return (
    <main className={"overflow-hidden"}>
      <Outlet />
      <CosmicStar />
    </main>
  );
};

export default RootLayout;
