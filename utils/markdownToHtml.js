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

const parseMarkdown = (str) => {
  const codeBlockRegex = /(```[\s\S]*?```)|(`[\s\S]*?`)/g;
  let lastIndex = 0;
  let result = "";

  str.replace(codeBlockRegex, (match, p1, p2, offset) => {
    const nonCodeBlock = str.slice(lastIndex, offset);
    result += nonCodeBlock
      .replace(/\$\$([^\$]+)\$\$/g, (match, expression) => {
        return katex.renderToString(expression, { displayMode: true });
      })
      .replace(/\$([^\$]+)\$/g, (match, expression) => {
        return katex.renderToString(expression, { displayMode: false });
      });
    result += match;
    lastIndex = offset + match.length;
  });

  const finalNonCodeBlock = str.slice(lastIndex);
  result += finalNonCodeBlock
    .replace(/\$\$([^\$]+)\$\$/g, (match, expression) => {
      return katex.renderToString(expression, { displayMode: true });
    })
    .replace(/\$([^\$]+)\$/g, (match, expression) => {
      return katex.renderToString(expression, { displayMode: false });
    });

  return marked(result);
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
                export const matter = ${front_matter}
                export const content = ${JSON.stringify(content)}`,
          map: null,
        };
      }
    },
  };
}
