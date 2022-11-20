import { fileURLToPath, URL } from "node:url";
// import from "vite-plu"

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), crx({ manifest })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
//    "browser_action": {
//     "default_title": "Vue Mostaql Extension",
//     "default_popup": "index.html"
//   }
