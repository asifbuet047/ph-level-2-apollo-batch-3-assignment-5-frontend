import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { MyBrowserRouter } from "./router/router.tsx";
import { Provider } from "react-redux";
import { ReduxStore } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={ReduxStore.store}>
      <PersistGate persistor={ReduxStore.persistor}>
        <RouterProvider router={MyBrowserRouter.router} />
      </PersistGate>
    </Provider>
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={true}
    ></ToastContainer>
  </StrictMode>
);
