import { useEffect } from "react";
import { Outlet } from "react-router";

import StaticNav from "@/components/layout/static-nav";

const StaticLayout = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-dark via-red-900/20 to-cosmic-dark">
      <StaticNav />
      <Outlet />
    </div>
  );
};

export default StaticLayout;
