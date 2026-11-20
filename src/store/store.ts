"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";

import storage from "@/store/create-storage";
import { authReducer } from "@/store/auth/auth.slice";
import { authApi } from "@/store/auth/auth.api";
import { locationReducer } from "@/store/location/location.slice";
import { settingsReducer } from "@/store/settings/settings.slice";
import { geocodingApi } from "@/store/geocoding/geocoding.api";
import { weatherApi } from "@/store/weather/weather.api";

const persistConfig = {
  timeout: 100,
  key: "max",
  storage,
  blacklist: [geocodingApi.reducerPath, weatherApi.reducerPath],
};

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  settings: settingsReducer,
  [authApi.reducerPath]: authApi.reducer,
  [geocodingApi.reducerPath]: geocodingApi.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(
        authApi.middleware,
        geocodingApi.middleware,
        weatherApi.middleware
      ),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
