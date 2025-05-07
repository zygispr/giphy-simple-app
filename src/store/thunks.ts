import type { AppThunk } from "./store.ts";
import type { CardProps } from "../components/molecules/Card/Card.tsx";
import { setGallery, toggleLock } from "./slice.ts";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage.ts";
import { selectCards } from "./selectors.ts";
import { fetchTrendingGifs } from "../api/giphy.ts";

const GALLERY_LOCAL_STORAGE_KEY = "gallery_locked_cards";

export const loadGalleryThunk =
  (count: number = 12): AppThunk =>
  async (dispatch) => {
    let cachedCards = getFromLocalStorage<CardProps[]>(GALLERY_LOCAL_STORAGE_KEY) ?? [];
    cachedCards = cachedCards.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const fetchCount = count - cachedCards.length;
    const fetchedCards = fetchCount > 0 ? await fetchTrendingGifs(fetchCount) : [];
    const mergedCards = [...cachedCards, ...fetchedCards];
    dispatch(setGallery(mergedCards));
  };

export const updateGalleryThunk = (): AppThunk => async (dispatch, getState) => {
  const currentCards = selectCards(getState());
  const unlockedCount = currentCards.filter((card) => !card.isLocked).length;
  if (unlockedCount === 0) {
    return;
  }

  const fetchedCards = await fetchTrendingGifs(unlockedCount);
  let i = 0;
  const mergedCards = currentCards.map((card) => (card.isLocked ? card : (fetchedCards[i++] ?? card)));
  dispatch(setGallery(mergedCards));
};

export const toggleLockThunk =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(toggleLock(id));
    const cards = selectCards(getState());
    const lockedCards = cards.filter((card) => card.isLocked);
    saveToLocalStorage<CardProps[]>(GALLERY_LOCAL_STORAGE_KEY, lockedCards);
  };
