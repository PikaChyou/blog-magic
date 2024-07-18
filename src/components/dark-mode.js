import settings from "@/settings.json";

const root = document.documentElement.querySelector(":root");

if (settings.dark_mode) {
  root.classList.remove("light-mode");
  root.classList.add("dark-mode");
} else {
  root.classList.remove("dark-mode");
  root.classList.add("light-mode");
}
