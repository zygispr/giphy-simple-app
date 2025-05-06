import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "./models/appState.ts";
import type { CardProps } from "../components/molecules/Card/Card.tsx";

export const toggleLock = (state: AppState, action: PayloadAction<string>) => {
  const id = action.payload;
  const card = state.cards.find((card) => card.id === id);
  if (card) {
    card.isLocked = !card.isLocked;
  }
};

export const setGallery = (state: AppState, action: PayloadAction<CardProps[]>) => {
  state.cards = action.payload;
};
