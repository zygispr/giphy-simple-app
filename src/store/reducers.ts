import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "./models/appState.ts";

export const toggleLock = (state: AppState, action: PayloadAction<string>) => {
  const id = action.payload;
  const card = state.cards.find((card) => card.id === id);
  if (card) {
    card.isLocked = !card.isLocked;
  }
};
