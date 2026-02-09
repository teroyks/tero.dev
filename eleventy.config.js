export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");

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

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
