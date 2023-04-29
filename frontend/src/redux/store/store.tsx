import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "../api/productsApi";
import { NODE_ENV } from "../../constants/config";
import choiceBarSlice from "../slices/choiceBarSlice";
import breadcrumbSlice from "../slices/breadcrumbSlice";
import productImagesSlice from "../slices/productImagesSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import shoppingCartSlice from "../slices/shoppingCartSlice";
import { addressApi } from "../api/addressApi";
import { authenticationApi } from "../api/authenticationApi";
import authenticationSlice from "../slices/authenticationSlice";

const cartPersistConfig = {
  key: "persisted_state",
  storage: storage,
  whitelist: [shoppingCartSlice.name, authenticationSlice.name],
};

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  choiceBar: choiceBarSlice.reducer,
  breadcrumb: breadcrumbSlice.reducer,
  productImages: productImagesSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  authentication: authenticationSlice.reducer,
});

const cartPersistReducer = persistReducer(cartPersistConfig, rootReducer);

export const store = configureStore({
  reducer: cartPersistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(productsApi.middleware)
      .concat(addressApi.middleware)
      .concat(authenticationApi.middleware),
  devTools: NODE_ENV !== "development" ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
