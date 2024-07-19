import { createApp } from "vue";
import App from "./App.vue";
import router from "@/index";

import settings from "@/settings.json";

const root = document.documentElement.querySelector("body");

if (settings.dark_mode) {
  root.classList.remove("light-mode");
  root.classList.add("dark-mode");
} else {
  root.classList.remove("dark-mode");
  root.classList.add("light-mode");
}

const app = createApp(App);

app.use(router);

app.mount("#app");
