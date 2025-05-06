import { type Action, configureStore, type ThunkAction } from "@reduxjs/toolkit";
import appReducer from "./slice";
import { devLoggerMiddleware } from "./loggerMiddleware.ts";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    middlewares.push(devLoggerMiddleware);
    return middlewares;
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
