import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/index";
import settings from "@/settings.json";
import { createPinia } from "pinia";
import "animate.css";

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

app.use(router);
app.use(pinia);

app.mount("#app");
