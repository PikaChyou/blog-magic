import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
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
      component: About,
    },
    ...posts,
  ],
});

export default router;
