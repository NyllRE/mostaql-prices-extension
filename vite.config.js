import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
// import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { chromeExtension } from "vite-plugin-chrome-extension";


// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	build: {
		rollupOptions: {
			input: "manifest.json"
		}
	},
	plugins: [
		chromeExtension()
	],
});
//    "browser_action": {
//     "default_title": "Vue Mostaql Extension",
//     "default_popup": "index.html"
//   }
