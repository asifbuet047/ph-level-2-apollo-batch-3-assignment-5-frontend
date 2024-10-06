import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { MyBrowserRouter } from "./router/router.tsx";
import { Provider } from "react-redux";
import { ReduxStore } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={ReduxStore.store}>
      <PersistGate persistor={ReduxStore.persistor}>
        <RouterProvider router={MyBrowserRouter.router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
