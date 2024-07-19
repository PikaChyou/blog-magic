import { marked } from "marked";
import katex from "katex";
import matter from "gray-matter";

import { countWords } from "./statistic";

marked.use({
  async: true,
  pedantic: false,
  gfm: true,
  mangle: false,
  headerIds: false,
});

const parseMatter = async (str) => {
  let date =
    str.date.getFullYear() +
    "-" +
    (str.date.getMonth() + 1) +
    "-" +
    str.date.getDate();
  return `
    <h1>${str.title}</h1>
    <p>发表于${date}</p>
    <p>分类:${str.categories}</p>
    <br/>`;
};

const parseMarkdown = (str) => {
  return marked(
    str
      .replace(/\$\$([^\$]+)\$\$/g, (match, expression) => {
        return katex.renderToString(expression, { displayMode: true });
      })
      .replace(/\$([^\$]+)\$/g, (match, expression) => {
        return katex.renderToString(expression, { displayMode: false });
      })
  );
};

export default function (options) {
  return {
    name: "vite-plugin-markdown",
    enforce: "pre",
    async transform(src, id) {
      if (id.endsWith(".md")) {
        const { data, content } = matter(src);

        const front_matter = JSON.stringify({
          title: data.title,
          date: data.date,
          categories: data.categories,
          words: countWords(content),
        });

        const main = JSON.stringify(await parseMarkdown(content));
        return {
          code: `import {h, defineComponent} from "vue";
                const article = defineComponent({
                    name: "Markdown",
                });

                article.render =() => {
                    return h("div", {
                      id: "write",
                      innerHTML: ${main}
                    })
                };

                export default article
                export const matter = ${front_matter}`,
          map: null,
        };
      }
    },
  };
}
