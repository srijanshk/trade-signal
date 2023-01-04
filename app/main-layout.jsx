"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/reducers";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";

export default function MainLayout({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider enableSystem={false} attribute="class">
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
