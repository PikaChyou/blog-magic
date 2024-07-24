import markdownit from "markdown-it";
import { fromHighlighter } from "@shikijs/markdown-it/core";
import { createHighlighterCore } from "shiki/core";
import getWasm from "shiki/wasm";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
} from "@shikijs/transformers";
import { katex } from "@mdit/plugin-katex";
import { imgLazyload } from "@mdit/plugin-img-lazyload";

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
    theme: "one-light",
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationFocus(),
    ],
  })
)
  .use(katex)
  .use(imgLazyload);
