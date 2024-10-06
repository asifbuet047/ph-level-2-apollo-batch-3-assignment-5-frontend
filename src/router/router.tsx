import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NoRouteFoundPage from "../pages/NoRouteFoundPage";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoRouteFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <NoRouteFoundPage />,
      },
    ],
  },
]);

export const MyBrowserRouter = {
  router: router,
};
