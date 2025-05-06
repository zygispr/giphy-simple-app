import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./reducers";
import type { AppState } from "./models/appState.ts";
import type { CardProps } from "../components/molecules/Card/Card.tsx";

const cards: CardProps[] = [
  {
    id: "1",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: false,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
  {
    id: "2",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: true,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
  {
    id: "3",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: false,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
  {
    id: "4",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: true,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
  {
    id: "5",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: false,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
  {
    id: "6",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: true,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
  {
    id: "7",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: false,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
  {
    id: "8",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: true,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
  {
    id: "9",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: false,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
  {
    id: "10",
    imgSrc:
      "https://media4.giphy.com/media/v1.Y2lkPTAxNWYyY2MzeXl0bXgxaW9ocTVienh5N3F1MDNmOWJvOHB3MHRoamZzNmswdGlqdCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/9rr8tmC2cmDv7T7JZG/200w.gif",
    isLocked: true,
    date: "2025-05-05",
    label: "#leisure #ba",
  },
];

const initialState: AppState = {
  cards,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: reducers,
  // TODO: add extra reducers
});

export const { toggleLock } = appSlice.actions;

export default appSlice.reducer;
