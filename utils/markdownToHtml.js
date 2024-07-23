import matter from "gray-matter";
import RemoveMD from "remove-markdown";
import { md } from "./parser";
import { countWords } from "./statistic";

export default function (options) {
  return {
    name: "vite-plugin-markdown",
    enforce: "pre",
    async transform(src, id) {
      if (id.endsWith(".md")) {
        const { data, content } = matter(src);

        const contentText = RemoveMD(content);

        const front_matter = JSON.stringify({
          title: data.title,
          date: data.date,
          categories: data.categories,
          words: countWords(contentText),
        });

        const main = JSON.stringify(md.render(content));
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
                export const content = ${JSON.stringify(contentText)}`,
          map: null,
        };
      }
    },
  };
}
