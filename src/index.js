import { createRouter, createWebHistory } from "vue-router";
import Categories from "@/views/Categories.vue";
import Archive from "@/views/Archive.vue";

const files = import.meta.glob("@/docs/*.md");

const data = await Promise.all(
  Object.keys(files).map(async (path) => {
    const module = await files[path]();
    const name = path.replace("/src/docs/", "").replace(".md", "");
    return {
      path: `/${name}`,
      component: files[path],
      meta: {
        info: module.matter,
      },
      ...module.matter,
    };
  })
);

const posts = data.map((item) => {
  return { path: item.path, component: item.component, meta: item.meta };
});

const catalogue = data.map(({ component, meta, ...rest }) => rest);

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
      props: { catalogue: catalogue },
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
