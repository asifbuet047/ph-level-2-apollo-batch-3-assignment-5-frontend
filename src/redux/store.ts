import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { allApiEndPoints } from "./api/allApiEndpoints";
import { cartReducer } from "./slices/cartSlice";
import { bikesReducer } from "./slices/bikesSlice";
import { filterReducer } from "./slices/filterSlice";
import { searchReducer } from "./slices/searchSlice";
import { authReducer } from "./slices/authSlice";

const cartPersistedConfiguration = {
  key: "cart",
  storage,
  whitelist: ["carts"],
};

const authPersistedConfiguration = {
  key: "auth",
  storage,
  whitelist: ["email", "token", "role"],
};

const cartPersistedReducer = persistReducer(
  cartPersistedConfiguration,
  cartReducer
);
const authPersistedReducer = persistReducer(
  authPersistedConfiguration,
  authReducer
);

const rootReducer = combineReducers({
  bikes: bikesReducer, //Non-Persisted
  filters: filterReducer, //Non-Persisted
  search: searchReducer, //Non-Persisted
  cart: cartPersistedReducer, //Persisted
  auth: authPersistedReducer, //Persisted
  [allApiEndPoints.reducerPath]: allApiEndPoints.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares({ serializableCheck: false }).concat(
      allApiEndPoints.middleware
    ),
});

const persistor = persistStore(store);

export const ReduxStore = { store, persistor };
