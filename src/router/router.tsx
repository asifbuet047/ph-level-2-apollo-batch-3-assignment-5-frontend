import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NoRouteFoundPage from "../pages/NoRouteFoundPage";
import HomePage from "../pages/HomePage";
import AuthenticationPage from "../pages/AuthenticationPage";
import AllBikesPage from "../pages/AllBikesPage";

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
      {
        path: "/auth",
        element: <AuthenticationPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/bikes",
        element: <AllBikesPage />,
        errorElement: <NoRouteFoundPage />,
      },
    ],
  },
]);

export const MyBrowserRouter = {
  router: router,
};
