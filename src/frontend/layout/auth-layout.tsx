import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
