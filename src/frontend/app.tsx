import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "@/frontend/layout/root-layout";
import RootPage from "@/frontend/pages/_root";
import SignInPage from "@/frontend/pages/sign-in";
import SignUpPage from "@/frontend/pages/sign-up";
import { authLoader } from "@/lib/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <RootPage />,
      },
      {
        path: "auth",
        children: [
          { path: "sign-in", element: <SignInPage /> },
          { path: "sign-up", element: <SignUpPage /> },
        ],
        loader: authLoader,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
