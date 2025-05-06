import type { AppThunk } from "./store.ts";
import type { CardProps } from "../components/molecules/Card/Card.tsx";
import { setGallery } from "./slice.ts";

const GIPHY_API_KEY = "2cGcN1Ypi7jZ1sxWfDtLptZoLRd22KzI";

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
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&fields=id,url,images.fixed_width&rating=g&limit=${limit}`);
    console.log(response);
    if (!response.ok) {
      console.error(`Giphy API error: ${response.statusText}`);
      return [];
    }

    const json: GiphyResponse = await response.json();
    console.log(json);

    const date = Date.now().toString();

    return json.data.map(
      (element: GiphyGif): CardProps => ({
        id: `${element.id}-${date}`,
        imgSrc: element.images.fixed_width.url,
        isLocked: false,
        date: date,
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
    console.log("All GIFs are locked - no fetch needed");
    return;
  }

  const newCards = await fetchGifs(unlockedCount);
  let i = 0;
  const mergedCards = currentCards.map((card) => (card.isLocked ? card : (newCards[i++] ?? card)));

  dispatch(setGallery(mergedCards));
};
