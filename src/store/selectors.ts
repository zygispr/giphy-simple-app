import type { RootState } from "./store.ts";

export const selectCards = (state: RootState) => state.gallery.cards;
