import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import markdownToHtml from "./utils/markdownToHtml";
import prismjs from "vite-plugin-prismjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    markdownToHtml(),
    prismjs({
      languages: "all",
      plugins: ["line-numbers", "copy-to-clipboard"],
      theme: "tomorrow",
      css: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
