import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section className={"flex min-h-screen min-w-screen justify-center items-center"}>
      <Outlet />
    </section>
  );
};

export default AuthLayout;
