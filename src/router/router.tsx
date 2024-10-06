import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NoRouteFoundPage from "../pages/NoRouteFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoRouteFoundPage />,
    children: [
      {
        path: "/",
        
      },
    ],
  },
]);

export const MyBrowserRouter = {
  router: router,
};
