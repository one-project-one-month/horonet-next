import React from "react";
import { Outlet } from "react-router";

import SignsNav from "@/components/static-signs/signs-nav";

const StaticSigns = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-dark via-red-900/20 to-cosmic-dark">
      <SignsNav />
      <Outlet />
    </div>
  );
};

export default StaticSigns;
