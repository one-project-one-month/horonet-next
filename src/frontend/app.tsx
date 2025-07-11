import { createBrowserRouter, RouterProvider } from "react-router";

import ErrorBoundary from "@/components/layout/error-boundary";
import Air from "@/components/static-signs/air";
import Earth from "@/components/static-signs/earth";
import Fire from "@/components/static-signs/fire";
import Water from "@/components/static-signs/water";
import UserProfilePage from "@/components/user-profile";
import AppLayout from "@/frontend/layout/app-layout";
import AuthLayout from "@/frontend/layout/auth-layout";
import RootLayout from "@/frontend/layout/root-layout";
import StaticLayout from "@/frontend/layout/static-layout";
import RootPage from "@/frontend/pages/_root";
import LandingPage from "@/frontend/pages/landing";
import OnboardingPage from "@/frontend/pages/onboarding";
import OnboardingSignPage from "@/frontend/pages/onboarding-sign";
import PrivacyPolicy from "@/frontend/pages/privacy-policy";
import ProfilePage from "@/frontend/pages/profile";
import SignInPage from "@/frontend/pages/sign-in";
import SignUpPage from "@/frontend/pages/sign-up";
import { authLoader } from "@/lib/loader";

import { CompatibilityPage } from "./pages/compatibility";

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
        element: <StaticLayout />,
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
        path: "privacy-policy",
        element: <StaticLayout />,
        children: [{ index: true, element: <PrivacyPolicy /> }],
      },
      {
        path: "terms-of-service",
        element: <StaticLayout />,
        children: [{ index: true, element: <div>TOS</div> }],
      },
      {
        path: "contact",
        element: <StaticLayout />,
        children: [{ index: true, element: <div>Contact</div> }],
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
          {
            path: "user",
            children: [
              { path: "profile", element: <ProfilePage /> },
              { path: ":userId", element: <UserProfilePage /> },
            ],
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
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
