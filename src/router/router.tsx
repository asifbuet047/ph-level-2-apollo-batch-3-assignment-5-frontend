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
import CartPage from "../pages/CartPage";
import ProfileEditPage from "../pages/ProfileEditPage";
import ProtectedComponent from "../components/ProtectedComponent";

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
        element: (
          <ProtectedComponent>
            <AddBikePage />
          </ProtectedComponent>
        ),
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
        element: (
          <ProtectedComponent>
            <ProfilePage />
          </ProtectedComponent>
        ),
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/edit",
        element: <ProfileEditPage />,
        errorElement: <NoRouteFoundPage />,
      },
    ],
  },
]);

export const MyBrowserRouter = {
  router: router,
};
