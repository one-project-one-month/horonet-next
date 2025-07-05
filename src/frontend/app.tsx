import { createBrowserRouter, RouterProvider } from "react-router";

import ErrorBoundary from "@/components/layout/error-boundary";
import Air from "@/components/static-signs/air";
import Earth from "@/components/static-signs/earth";
import Fire from "@/components/static-signs/fire";
import Water from "@/components/static-signs/water";
import AppLayout from "@/frontend/layout/app-layout";
import AuthLayout from "@/frontend/layout/auth-layout";
import RootLayout from "@/frontend/layout/root-layout";
import RootPage from "@/frontend/pages/_root";
import LandingPage from "@/frontend/pages/landing";
import OnboardingPage from "@/frontend/pages/onboarding";
import OnboardingSignPage from "@/frontend/pages/onboarding-sign";
import ProfilePage from "@/frontend/pages/profile";
import SignInPage from "@/frontend/pages/sign-in";
import SignUpPage from "@/frontend/pages/sign-up";
import { authLoader } from "@/lib/loader";

import { CompatibilityPage } from "./pages/compatibility";
import StaticSigns from "./pages/static-signs";

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
        path: "signs",
        element: <StaticSigns />,
        children: [
          {
            path: "fire",
            element: <Fire />,
          },
          {
            path: "air",
            element: <Air />,
          },
          {
            path: "water",
            element: <Water />,
          },
          {
            path: "earth",
            element: <Earth />,
          },
        ],
      },
      {
        path: "app",
        element: <AppLayout />,
        children: [
          {
            path: "horoscope",
            element: <RootPage />,
          },
          {
            path: "wisdom",
          },
          {
            path: "compatibility",
            element: <CompatibilityPage />,
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
          { index: true, element: <OnboardingPage /> },
          { path: "sign", element: <OnboardingSignPage /> },
        ],
      },
      {
        path: "/app/user/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
