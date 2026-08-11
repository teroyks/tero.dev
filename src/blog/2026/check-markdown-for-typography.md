---
title: Check Markdown for Typography
description: Helper recipe for checking parts of typography you might want to fix.
date: 2026-08-11
tags:
  - markdown
  - just
  - command-line
  - eleventy
---

When creating sites with lots of text content (especially imported from somewhere else)—I do this a lot with [Eleventy] sites—one thing I often forget to check is using proper typographic characters (replacing things like straight quotes, ellipses, etc.). So I wrote a couple of [Just] recipes to help me with that.

Sometimes, my site build includes automatic conversion of these characters, but I don't always want that: I might, for example, need the Markdown source for other purposes and want the proper characters to be there, not just the published HTML; or, there might be multiple languages with different typographic conventions involved, so one shoe does not fit all quotes.

_Note:_ These are crude helpers that can trip over things like code excerpts within the documents, so they are mostly useful just for an extra check for things I might have forgotten.

The main gist here is the `search` recipe: it looks for Markdown files under `src/` (the document directory for that particular site), ignores the frontmatter (always present in my site files; `sed` removes the content from it so it never matches), and then greps for given regex pattern, and prints the results (if found). The rest is just different patterns to search for, and the main recipe, `chars`, that looks for them.

With this `justfile` in place, I run `just chars`, and get a list of possible characters that should have been converted.

{% raw %}

```shell
# Search the markdown sources for a pattern
search pattern:
    #!/usr/bin/env bash
    for f in $(fd -g '*.md' src/); do
        # skip frontmatter, print matches (if found)
        matches=$(sed '1,/^---$/s/.*//' "$f" | rg --line-number --color=always --regexp={{quote(pattern)}}) || continue
        printf '%s\n%s\n\n' "$f" "$matches"
    done

# Find unconverted ellipses
ellipsis: (search '\.\.\.')

# Find unconverted double quotes
double-quotes: (search '"')

# Find unconverted single quotes
single-quotes: (search "'")

# Find hyphens that probably should be non-breaking
non-breaking-hyphen: (search ' -[\wåäöÅÄÖ]')

# Find places that probably would require an n-dash
n-dash: (search ' - |\d-\d')

# Find probable unconverted characters
chars: ellipsis double-quotes single-quotes non-breaking-hyphen n-dash
```

{% endraw %}

If you have a large site, this helper is probably not for you, since it has no performance optimization: each recipe does the search again, and cleans up the frontmatter from all the files. This doesn't matter to me (my sites are small) but for big sites, you'll want something more optimized.

[Eleventy]: https://www.11ty.dev
[Just]: https://github.com/casey/just
