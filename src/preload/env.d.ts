/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly PRELOAD_VITE_API_URL: string;
    readonly PRELOAD_VITE_API_VERSION: string;
    readonly PRELOAD_VITE_API_ENDPOINT: string;
    readonly PRELOAD_VITE_DB_FOLDER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
