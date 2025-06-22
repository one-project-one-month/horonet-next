import { Outlet } from "react-router";

import CosmicStar from "@/components/layout/cosmic-star";

const RootLayout = () => {
  return (
    <main>
      <div className={"relative min-h-screen"}>
        {Array.from({ length: 100 }).map((_, i) => (
          <CosmicStar key={i} />
        ))}
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
