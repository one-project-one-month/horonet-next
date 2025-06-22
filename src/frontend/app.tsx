import { createBrowserRouter, RouterProvider } from "react-router";

import AuthLayout from "@/frontend/layout/auth-layout";
import RootLayout from "@/frontend/layout/root-layout";
import RootPage from "@/frontend/pages/_root";
import LandingPage from "@/frontend/pages/landing";
import SignInPage from "@/frontend/pages/sign-in";
import SignUpPage from "@/frontend/pages/sign-up";
import { authLoader } from "@/lib/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <RootPage />,
      },
      {
        path: "landing",
        element: <LandingPage />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "sign-in", element: <SignInPage /> },
          { path: "sign-up", element: <SignUpPage /> },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
