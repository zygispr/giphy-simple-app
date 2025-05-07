import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./reducers";
import type { GalleryState } from "./models/galleryState.ts";

const initialState: GalleryState = {
  cards: [],
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: reducers,
});

export const { toggleLock, setGallery } = gallerySlice.actions;

export default gallerySlice.reducer;
