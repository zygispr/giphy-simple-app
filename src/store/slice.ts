import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./reducers";
import type { AppState } from "./models/appState.ts";

const initialState: AppState = {
  cards: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: reducers,
  // TODO: add extra reducers
});

export const { toggleLock, setGallery } = appSlice.actions;

export default appSlice.reducer;
