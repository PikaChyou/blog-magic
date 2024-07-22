import { defineStore } from "pinia";
export const useSearchStore = defineStore("search", {
  state: () => {
    return { isOpen: false };
  },
  actions: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
});
