import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { MyBrowserRouter } from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={MyBrowserRouter.router} />
  </StrictMode>
);
