/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GIPHY_BASE_URL: string;
  readonly VITE_GIPHY_API_KEY: string;
  readonly VITE_GIPHY_TOTAL_COUNT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
