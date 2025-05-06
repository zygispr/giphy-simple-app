import type { AppThunk } from "./store.ts";
import type { CardProps } from "../components/molecules/Card/Card.tsx";
import { setGallery, toggleLock } from "./slice.ts";
import { getCardsFromLocalStorage, saveCardsToLocalStorage } from "../utils/storage.ts";
import { selectCards } from "./selectors.ts";

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

interface GiphyImage {
  url: string;
  width: string;
  height: string;
  size: string;
}

interface GiphyImages {
  fixed_width: GiphyImage;
}

interface GiphyGif {
  id: string;
  title: string;
  import_datetime: string;
  images: GiphyImages;
}

interface GiphyResponse {
  data: GiphyGif[];
  meta: {
    status: number;
    msg: string;
  };
}

const fetchGifs = async (limit: number): Promise<CardProps[]> => {
  try {
    const maxOffset = Math.max(0, 500 - limit);
    const offset = Math.floor(Math.random() * (maxOffset + 1));

    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&fields=id,title,import_datetime,images.fixed_width&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`
    );
    if (!response.ok) {
      console.error(`Giphy API error (status code: ${response.status}, status text: ${response.statusText})`);
      return [];
    }

    const json: GiphyResponse = await response.json();
    const date = new Date();

    return json.data.map(
      (element: GiphyGif): CardProps => ({
        id: `${element.id}-${date.getTime()}`, // there's a chance to retrieve same GIF, so need a unique id for key prop
        imgSrc: element.images.fixed_width.url,
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
  (limit: number = 12): AppThunk =>
  async (dispatch) => {
    const lockedCards = getCardsFromLocalStorage().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const newLimit = limit - lockedCards.length;
    const newCards = newLimit > 0 ? await fetchGifs(newLimit) : [];
    const allCards = [...lockedCards, ...newCards];
    dispatch(setGallery(allCards));
  };

export const updateGalleryThunk = (): AppThunk => async (dispatch, getState) => {
  const currentCards = selectCards(getState());
  const unlockedCount = currentCards.filter((card) => !card.isLocked).length;
  if (unlockedCount === 0) {
    return;
  }

  const newCards = await fetchGifs(unlockedCount);
  let i = 0;
  const mergedCards = currentCards.map((card) => (card.isLocked ? card : (newCards[i++] ?? card)));

  dispatch(setGallery(mergedCards));
};

export const toggleLockThunk =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(toggleLock(id));
    const cards = selectCards(getState());
    const lockedCards = cards.filter((card) => card.isLocked);
    saveCardsToLocalStorage(lockedCards);
  };
