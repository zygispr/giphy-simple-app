import type { CardProps } from "../components/molecules/Card/Card.tsx";
import type { GiphyResponse, GiphyGif } from "./models/giphyResponse.ts";

const { VITE_GIPHY_BASE_URL: GIPHY_BASE_URL, VITE_GIPHY_API_KEY: GIPHY_API_KEY, VITE_GIPHY_TOTAL_COUNT: GIPHY_TOTAL_COUNT } = import.meta.env;

export const fetchTrendingGifs = async (count: number): Promise<CardProps[]> => {
  try {
    const maxOffset = Math.max(0, GIPHY_TOTAL_COUNT - count);
    const offset = Math.floor(Math.random() * (maxOffset + 1));

    const endpoint = "v1/gifs/trending";
    const queryParams = new URLSearchParams({
      api_key: GIPHY_API_KEY,
      fields: "id,title,import_datetime,images.fixed_width_downsampled",
      limit: count.toString(),
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
