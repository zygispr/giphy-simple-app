import type { PayloadAction } from "@reduxjs/toolkit";
import type { GalleryState } from "./models/galleryState.ts";
import type { CardProps } from "../components/molecules/Card/Card.tsx";

export const toggleLock = (state: GalleryState, action: PayloadAction<string>) => {
  const id = action.payload;
  const card = state.cards.find((card) => card.id === id);
  if (card) {
    card.isLocked = !card.isLocked;
  }
};

export const setGallery = (state: GalleryState, action: PayloadAction<CardProps[]>) => {
  state.cards = action.payload;
};
