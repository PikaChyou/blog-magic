import { createApp } from "vue";
import { createPinia } from "pinia";
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

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
