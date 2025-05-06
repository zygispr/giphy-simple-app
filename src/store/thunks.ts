import type { AppThunk } from "./store.ts";
import type { CardProps } from "../components/molecules/Card/Card.tsx";
import { setGallery } from "./slice.ts";

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
  console.log(GIPHY_API_KEY);
  try {
    const maxOffset = Math.max(0, 10 - limit);
    const offset = Math.floor(Math.random() * (maxOffset + 1));

    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&fields=id,images.fixed_width&limit=${limit}&offset=${0}&rating=g&bundle=messaging_non_clips`
    );
    console.log(response);
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
        date: date.toISOString(),
        label: "test",
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
    const cards = await fetchGifs(limit);
    dispatch(setGallery(cards));
  };

export const updateGalleryThunk = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const currentCards = state.app.cards;
  const unlockedCount = currentCards.filter((card) => !card.isLocked).length;
  if (unlockedCount === 0) {
    return;
  }

  const newCards = await fetchGifs(unlockedCount);
  let i = 0;
  const mergedCards = currentCards.map((card) => (card.isLocked ? card : (newCards[i++] ?? card)));

  dispatch(setGallery(mergedCards));
};
