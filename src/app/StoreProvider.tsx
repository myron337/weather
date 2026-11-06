"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import type { Persistor } from "redux-persist";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { makeStore } from "@/store/store";

export type StoreProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => makeStore());
  const [persistor] = useState<Persistor>(() => persistStore(store));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
