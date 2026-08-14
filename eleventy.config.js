import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { HtmlValidate } from "html-validate";

const htmlValidator = new HtmlValidate({
  extends: ["html-validate:recommended"],
  rules: {
    "no-trailing-whitespace": "off",
    "no-raw-characters": "warn",
  },
});

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/**/*.{png,jpg,jpeg,svg,webp,avif}");

  // validate HTML output per template
  eleventyConfig.addLinter("html-validate", async function (content) {
    if (!this.outputPath?.endsWith(".html")) return;
    const report = await htmlValidator.validateString(content);
    if (!report.valid) {
      for (const result of report.results) {
        for (const msg of result.messages) {
          console.error(
            `[html-validate] ${this.outputPath}:${msg.line}:${msg.column}  ${msg.message}  (${msg.ruleId})`,
          );
        }
      }
    }
  });

  // validate JSON output per template
  eleventyConfig.addLinter("json-validate", function (content) {
    if (!this.outputPath?.endsWith(".json")) return;
    try {
      JSON.parse(content);
    } catch (error) {
      console.error(`[json-validate] ${this.outputPath}  ${error.message}`);
    }
  });

  // convert straight quotes, ellipsis, and em and en dashes to typographic equivalents
  // use '--' for en dashes and '---' for em dashes
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.set({ typographer: true });
  });

  // custom "date" filter for templates
  // usage: {{ date | date }} for "February 9, 2026"
  //        {{ date | date: "%Y" }} for "2026" (used in blog permalinks)
  eleventyConfig.addFilter("date", (value, format) => {
    const date = new Date(value);
    if (format === "%Y") return date.getFullYear().toString();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // custom "absoluteUrls" filter for making feed content standalone
  // usage: {{ content | absoluteUrls(base) }} where base is the page's full URL
  // rewrite relative href and src values only
  eleventyConfig.addFilter("absoluteUrls", (html, base) =>
    html.replace(
      /(href|src)="(?!https?:|\/\/)([^"]*)"/g,
      (match, attribute, url) => `${attribute}="${new URL(url, base)}"`,
    ),
  );

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
