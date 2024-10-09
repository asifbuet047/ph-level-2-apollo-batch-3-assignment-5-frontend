import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NoRouteFoundPage from "../pages/NoRouteFoundPage";
import HomePage from "../pages/HomePage";
import AuthenticationPage from "../pages/AuthenticationPage";
import AllBikesPage from "../pages/AllBikesPage";
import AddBikePage from "../pages/AddBikePage";
import SignupPage from "../pages/SignupPage";
import LoggingPage from "../pages/LoggingPage";
import ProfilePage from "../pages/ProfilePage";
import LogoutPage from "../pages/LogoutPage";

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
      {
        path: "/add",
        element: <AddBikePage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/login",
        element: <LoggingPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
        errorElement: <NoRouteFoundPage />,
      },
    ],
  },
]);

export const MyBrowserRouter = {
  router: router,
};
