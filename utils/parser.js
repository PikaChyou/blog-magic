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

const fence = md.renderer.rules.fence;
md.renderer.rules.fence = (...args) => {
  const rawCode = fence(...args);
  const code = rawCode.slice(
    rawCode.indexOf("<span"),
    rawCode.indexOf("</code>")
  );

  const lines = code.split("\n");

  const innerCode = [...Array(lines.length)]
    .map((_, index) => {
      const i = lines[index].indexOf(">");
      return (
        lines[index].slice(0, i + 1) +
        `<div class="line-number"> ${index} </div>` +
        lines[index].slice(i + 1) +
        "\n"
      );
    })
    .join("");

  const finalCode = rawCode.replace(code, innerCode);
  const pureCode = encodeURIComponent(
    code.replace(/<\/?[^>]+(>|$)/g, "").trim()
  );

  return `<div class="code-block"><div class="code-block-header"><button class="copy-btn" data-clipboard-text="${pureCode}">copy</button></div>${finalCode}</div>`;
};

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
