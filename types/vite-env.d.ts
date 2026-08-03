/// <reference types="vite/client" />
declare const __IS_VITE_BUILD__: boolean;

interface ImportMetaEnv {
  readonly VITE_CASE_STUDIES_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  /** Set by main.ts so React can refresh WebGL after #globe is shown or reparented. */
  __portfolioGlobeResize?: () => void;
}
