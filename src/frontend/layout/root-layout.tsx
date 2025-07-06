import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className={"overflow-hidden"}>
      <Outlet />
    </main>
  );
};

export default RootLayout;
