"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/reducers";
import { ThemeProvider } from "next-themes";

export default function MainLayout({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider enableSystem={false} attribute="class">
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
