import { createBrowserRouter, RouterProvider } from "react-router";

import RootPage from "@/frontend/pages/_root";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <RootPage />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
