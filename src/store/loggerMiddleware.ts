import { isAction, type Middleware } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

export const devLoggerMiddleware: Middleware<object, RootState> = (store) => (next) => (action) => {
  if (isAction(action)) {
    console.group(action.type);
    console.info("dispatching", action);
  } else {
    console.group("unknown/undefined");
    console.warn("dispatching", action);
  }
  console.log("previous state", store.getState());
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export const loggerMiddleware: Middleware = () => (next) => (action) => {
  // loggerMiddleware could be used to send tracking data to Adobe Analytics to track user's actions for example
  return next(action);
};
