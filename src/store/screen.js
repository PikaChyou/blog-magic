import { defineStore } from "pinia";

export const useScreenStore = defineStore("screen", {
  state: () => {
    return { isWideScreen: false };
  },
  actions: {
    setScreen(data) {
      this.isWideScreen = data;
    },
  },
});
