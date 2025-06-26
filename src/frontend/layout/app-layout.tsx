import { Outlet } from "react-router";

import RootNav from "@/components/layout/root-nav";

const AppLayout = () => {
  return (
    <>
      <RootNav />
      <Outlet />
    </>
  );
};

export default AppLayout;
