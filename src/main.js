import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/index";
import settings from "@/settings.json";
import { createPinia } from "pinia";
import "animate.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarDays,
  faPenToSquare,
  faFolderOpen,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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

library.add(faCalendarDays, faPenToSquare, faFolderOpen, faBackward);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(pinia);

app.mount("#app");
