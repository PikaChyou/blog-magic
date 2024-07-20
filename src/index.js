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

export const archives = data
  .map(({ component, meta, ...rest }) => rest)
  .sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

export const categories = data
  .map(({ component, meta, ...rest }) => rest)
  .reduce((pre, cur) => {
    const category = cur.categories;
    if (!pre[category]) {
      pre[category] = [];
    }
    pre[category].push(cur);
    return pre;
  }, {});

export const router = createRouter({
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
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path && to.hash === from.hash) {
      return;
    }
    if (savedPosition) {
      return { ...savedPosition, behavior: "smooth" };
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});
