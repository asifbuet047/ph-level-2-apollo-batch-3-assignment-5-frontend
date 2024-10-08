import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { allApiEndPoints } from "./api/allApiEndpoints";
import { cartReducer } from "./slices/cartSlice";
import { bikesReducer } from "./slices/bikesSlice";
import { filterReducer } from "./slices/filterSlice";
import { searchReducer } from "./slices/searchSlice";

const persistConfiguratio = {
  key: "cart",
  storage,
  whitelist: ["cart"],
};

const allReducers = combineReducers({
  bikes: bikesReducer, //Non-Persisted
  filters: filterReducer, //Non-Persisted
  search: searchReducer,
  cart: cartReducer, //Persisted
  [allApiEndPoints.reducerPath]: allApiEndPoints.reducer,
});
const persistedReducer = persistReducer(persistConfiguratio, allReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares({ serializableCheck: false }).concat(
      allApiEndPoints.middleware
    ),
});

const persistor = persistStore(store);

export const ReduxStore = { store, persistor };
