#!/usr/bin/env node
import matter from "gray-matter";
import { glob, readFile } from "node:fs/promises";

const postsGlob = "src/blog/**/*.md";

// make sure we didn't forget to write a description
const hasWordCharacter = /\w/;

// check the files given as arguments (the commit hook passes staged posts),
// or every post when called without arguments
async function postsToCheck() {
  const [_node, _script, ...args] = process.argv;
  if (args.length > 0) return args;

  return Array.fromAsync(glob(postsGlob));
}

const missingDescription = description => !description || !hasWordCharacter.test(description);
const emptyTag = maybeTag => typeof maybeTag !== 'string' || !maybeTag.trim();
const tagsOf = data => [data.tags ?? []].flat();

// each check pairs a test on the front matter with the problem it reports
const checks = [
  [data => missingDescription(data.description), "missing or placeholder description"],
  [data => tagsOf(data).some(emptyTag), "empty tag"],
];

const findProblems = data =>
  checks.filter(([hasProblem]) => hasProblem(data)).map(([, problem]) => problem);

let errors = 0;
let totalFiles = 0;

console.log("[frontmatter] Checking post front matter...\n");

for (const file of await postsToCheck()) {
  const { data } = matter(await readFile(file, "utf8"));

  // test posts are deliberately minimal and never published
  if (data.eleventyExcludeFromCollections) continue;

  totalFiles++;

  for (const problem of findProblems(data)) {
    console.error(`[frontmatter] ${file}  ${problem}`);
    errors++;
  }
}

console.log(`\n[frontmatter] Checked ${totalFiles} files`);

if (errors > 0) {
  console.error(`[frontmatter] ${errors} front matter problem(s) found`);
  process.exit(1);
} else {
  console.log("[frontmatter] No front matter problems found");
}
