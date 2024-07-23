import { marked } from "marked";
import katex from "katex";
import { codeToHtml } from "shiki";

marked.use({
  async: true,
  pedantic: false,
  gfm: true,
  mangle: false,
  headerIds: false,
});

// const parseCode = {
//   codespan(src) {
//     const match = src.match(/(```[\s\S]*?```)/);
//     if (match) {
//       return {
//         type: "text",
//         raw: match[0],
//         text: match[1].trim(),
//       };
//     }
//     return false;
//   },
// };

const renderer = {
  code(text) {
    codeToHtml(text, {
      lang: "javascript",
      theme: "vitesse-dark",
    }).then((res) => {
      return `asd`;
    });
  },
};

marked.use({ renderer });

console.log(await marked.parse("```js\nconsole.log('Hello, World!')\n```"));

const parseKatex = (str) => {
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
  return result;
};

export const parseMarkdown = (str) => {
  const result = parseKatex(str);
  return marked.parse(result);
};
