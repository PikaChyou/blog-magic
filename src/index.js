import { createRouter, createWebHistory } from "vue-router";
import Categories from "@/views/Categories.vue";
import Archive from "@/views/Archive.vue";
import FlexSearch from "flexsearch";
import { reactive } from "vue";

var index_id = 0;
function splitText(text) {
  const str = Array.from(
    new Intl.Segmenter("cn", { granularity: "word" }).segment(text)
  );
  return str.map((segment) => segment.segment);
}
export const index = new FlexSearch.Document({
  cache: 100,
  document: {
    id: "id",
    store: ["path", "title", "date"],
    index: ["title", "content", "categories", "date"],
  },
  encode: splitText,
});

const files = import.meta.glob("@/docs/*.md");

export const archives = reactive([]);
export const categories = reactive({});

async function loadData(files) {
  const posts = [];

  const result = await Promise.all(
    Object.keys(files).map(async (path) => {
      const module = await files[path]();
      const name = path.replace("/src/docs/", "").replace(".md", "");
      index.add({
        id: index_id++,
        path: `/${name}`,
        title: module.matter.title,
        content: module.content,
        date: module.matter.date,
        categories: module.matter.categories,
      });
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

  result.forEach((item) => {
    posts.push({ path: item.path, component: item.component, meta: item.meta });
    const { component, meta, ...rest } = item;
    archives.push(rest);

    const category = item.categories;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(rest);
  });

  return posts;
}

const routerPromise = loadData(files).then((posts) => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/archive",
        component: () => import("@/views/Archive.vue"),
      },
      {
        path: "/categories",
        component: () => import("@/views/Categories.vue"),
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

  return router;
});

export { routerPromise as router };
