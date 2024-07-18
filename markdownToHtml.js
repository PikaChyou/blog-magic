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
                const _sfc_md = defineComponent({
                    name: "Markdown",
                });

                const _sfc_render =() => {
                    return h("div", {
                      innerHTML: ${JSON.stringify(html)}, 
                    })
                };

                _sfc_md.render = _sfc_render
                export default _sfc_md`,
          map: null,
        };
      }
    },
  };
}
