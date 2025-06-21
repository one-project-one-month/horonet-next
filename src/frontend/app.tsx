import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    children: [{
      index: true,
      element: <div>Hello...</div>,
    }],
  },
]);
const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
