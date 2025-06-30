import { createBrowserRouter, RouterProvider } from "react-router";

import ErrorBoundary from "@/components/layout/error-boundary";
import AppLayout from "@/frontend/layout/app-layout";
import AuthLayout from "@/frontend/layout/auth-layout";
import RootLayout from "@/frontend/layout/root-layout";
import RootPage from "@/frontend/pages/_root";
import LandingPage from "@/frontend/pages/landing";
import OnboardingPage from "@/frontend/pages/onboarding";
import OnboardingSignPage from "@/frontend/pages/onboarding-sign";
import SignInPage from "@/frontend/pages/sign-in";
import SignUpPage from "@/frontend/pages/sign-up";
import { authLoader } from "@/lib/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: authLoader,
    errorElement: <ErrorBoundary />,
    id: "root",
    children: [
      {
        path: "landing",
        element: <LandingPage />,
      },
      {
        path: "app",
        element: <AppLayout />,
        children: [
          {
            path: "horoscope",
            element: <RootPage />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "sign-in", element: <SignInPage /> },
          { path: "sign-up", element: <SignUpPage /> },
        ],
      },
      {
        path: "onboarding",
        element: <AuthLayout />,
        children: [
          // @ts-expect-error This page is super correct
          { index: true, element: <OnboardingPage /> },
          // @ts-expect-error This page is super correct
          { path: "sign", element: <OnboardingSignPage /> },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
