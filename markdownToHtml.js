import { marked } from "marked";
import katex from "katex";

marked.use({
  async: true,
  pedantic: false,
  gfm: true,
  mangle: false,
  headerIds: false,
});

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
        const html = await parseMarkdown(src);
        return {
          code: `import {h, defineComponent} from "vue";
                const article = defineComponent({
                    name: "Markdown",
                });

                article.render =() => {
                    return h("div", {
                      id: "write",
                      innerHTML: ${JSON.stringify(html)}
                    })
                };

                export default article`,
          map: null,
        };
      }
    },
  };
}
