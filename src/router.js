import { createRouter, createWebHistory } from "vue-router";
import Categories from "@/views/Categories.vue";
import Archive from "@/views/Archive.vue";

const files = import.meta.glob("@/docs/*.md");
const posts = Object.keys(files).map((path) => {
  const name = path.replace("/src/docs/", "").replace(".md", "");
  return {
    path: `/${name}`,
    component: files[path],
  };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/archive",
      component: Archive,
    },
    {
      path: "/categories",
      component: Categories,
    },
    {
      path: "/about",
      component: () => import("@/about.md"),
    },
    ...posts,
  ],
});

export default router;
