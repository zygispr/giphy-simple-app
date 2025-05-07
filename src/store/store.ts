import { type Action, configureStore, type ThunkAction } from "@reduxjs/toolkit";
import galleryReducer from "./slice";
import { devLoggerMiddleware, loggerMiddleware } from "./loggerMiddleware.ts";

export const isDevelopmentMode = (): boolean => {
  return import.meta.env.MODE === "development";
};

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (isDevelopmentMode()) {
      middlewares.push(devLoggerMiddleware);
    } else {
      middlewares.push(loggerMiddleware);
    }
    return middlewares;
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
