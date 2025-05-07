export interface GiphyResponse {
  data: GiphyGif[];
  meta: {
    status: number;
    msg: string;
  };
}

export interface GiphyGif {
  id: string;
  title: string;
  import_datetime: string;
  images: GiphyImages;
}

interface GiphyImages {
  fixed_width_downsampled: GiphyImage;
}

interface GiphyImage {
  url: string;
  width: string;
  height: string;
  size: string;
}
