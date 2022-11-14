// import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState, rootReducer) {
  let ENV = process.env.NODE_ENV;
  let composeEnhancers = compose;

  if (ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    const composeWithDevToolsExtension = composeWithDevTools;

    if (typeof composeWithDevToolsExtension === "function") {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = createStore(
    rootReducer, // root reducer with router state
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}