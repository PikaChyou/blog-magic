import { createRouter, createWebHistory } from "vue-router";
import Categories from "@/views/Categories.vue";
import Archive from "@/views/Archive.vue";
import FlexSearch from "flexsearch";

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
    store: ["href", "title"],
    index: ["title", "content"],
  },
  encode: splitText,
});

const files = import.meta.glob("@/docs/*.md");

const data = await Promise.all(
  Object.keys(files).map(async (path) => {
    const module = await files[path]();
    const name = path.replace("/src/docs/", "").replace(".md", "");
    index.add({
      id: index_id++,
      href: `/${name}`,
      title: module.matter.title,
      content: module.content,
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

console.log(
  index.search("我们", { enrich: true })[0].result.map((item) => item.doc)
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
