import type { AppThunk } from "./store.ts";
import type { CardProps } from "../components/molecules/Card/Card.tsx";
import { setGallery, toggleLock } from "./slice.ts";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage.ts";
import { selectCards } from "./selectors.ts";
import type { GiphyGif, GiphyResponse } from "./models/giphyResponse.ts";

const { VITE_GIPHY_BASE_URL: GIPHY_BASE_URL, VITE_GIPHY_API_KEY: GIPHY_API_KEY, VITE_GIPHY_TOTAL_COUNT: GIPHY_TOTAL_COUNT } = import.meta.env;
const GALLERY_LOCAL_STORAGE_KEY = "gallery_locked_cards";

const fetchGifs = async (limit: number): Promise<CardProps[]> => {
  try {
    const maxOffset = Math.max(0, GIPHY_TOTAL_COUNT - limit);
    const offset = Math.floor(Math.random() * (maxOffset + 1));

    const endpoint = "v1/gifs/trending";
    const queryParams = new URLSearchParams({
      api_key: GIPHY_API_KEY,
      fields: "id,title,import_datetime,images.fixed_width_downsampled",
      limit: limit.toString(),
      offset: offset.toString(),
      rating: "g",
      bundle: "messaging_non_clips",
    });
    const url = `${GIPHY_BASE_URL}/${endpoint}?${queryParams.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Giphy API error (status code: ${response.status}, status text: ${response.statusText})`);
      return [];
    }

    const json: GiphyResponse = await response.json();
    const date = new Date();

    return json.data.map(
      (element: GiphyGif): CardProps => ({
        id: `${element.id}-${date.getTime()}`, // there's a chance to retrieve same GIF, so need a unique id for key prop
        imgSrc: element.images.fixed_width_downsampled.url,
        isLocked: false,
        date: element.import_datetime,
        label: element.title,
      })
    );
  } catch (error) {
    console.error("Failed to fetch GIFs:", error);
    return [];
  }
};

export const loadGalleryThunk =
  (count: number = 12): AppThunk =>
  async (dispatch) => {
    let cachedCards = getFromLocalStorage<CardProps[]>(GALLERY_LOCAL_STORAGE_KEY) ?? [];
    cachedCards = cachedCards.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const fetchCount = count - cachedCards.length;
    const fetchedCards = fetchCount > 0 ? await fetchGifs(fetchCount) : [];
    const mergedCards = [...cachedCards, ...fetchedCards];
    dispatch(setGallery(mergedCards));
  };

export const updateGalleryThunk = (): AppThunk => async (dispatch, getState) => {
  const currentCards = selectCards(getState());
  const unlockedCount = currentCards.filter((card) => !card.isLocked).length;
  if (unlockedCount === 0) {
    return;
  }

  const fetchedCards = await fetchGifs(unlockedCount);
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
