#!/usr/bin/env node
import pa11y from "pa11y";
import { glob } from "node:fs/promises";

const outputDir = "_site";

let errors = 0;
let totalFiles = 0;

console.log("[pa11y] Running accessibility checks...\n");

for await (const file of glob(`${outputDir}/**/*.html`)) {
  totalFiles++;
  const results = await pa11y(file, { runners: ["htmlcs"] });

  for (const issue of results.issues) {
    if (issue.type === "error") {
      console.error(
        `[pa11y] ${file}:${issue.line}:${issue.column}  ${issue.message}`,
      );
      errors++;
    }
  }
}

console.log(`\n[pa11y] Checked ${totalFiles} files`);

if (errors > 0) {
  console.error(`[pa11y] ${errors} accessibility error(s) found`);
  process.exit(1);
} else {
  console.log("[pa11y] No accessibility errors found");
}
