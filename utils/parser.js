import markdownit from "markdown-it";
import { fromHighlighter } from "@shikijs/markdown-it/core";
import { createHighlighterCore } from "shiki/core";
import getWasm from "shiki/wasm";
import { katex } from "@mdit/plugin-katex";

const highlighter = await createHighlighterCore({
  themes: [
    import("shiki/themes/one-light.mjs"),
    import("shiki/themes/one-dark-pro.mjs"),
  ],
  langs: [
    import("shiki/langs/javascript.mjs"),
    import("shiki/langs/python.mjs"),
  ],
  loadWasm: getWasm,
});

export const md = markdownit();
md.use(
  fromHighlighter(highlighter, {
    lang: "javascript",
    theme: "one-light",
  })
).use(katex);

export const parseMarkdown = (str) => {
  return md.render(str);
};
