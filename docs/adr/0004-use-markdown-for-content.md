# ADR-0004: Use Markdown for blog content

## Status

Accepted

## Context

The site is blog-focused and needs a content authoring format that is easy to write,
version-controllable,
and renders well with Pico CSS's semantic HTML styling.

I like writing in Markdown, and don't want a rich text editor.

At least for now, there is no need for an external CMS.
It should be easy enough to manage content locally with Markdown files.

## Decision

Use Markdown with YAML front matter for all blog posts and content pages.
Eleventy processes these natively via its built-in Markdown support (markdown-it).

## Consequences

- Content is portable — plain text files in git, not locked to any CMS.
- Front matter provides metadata (title, date, tags) that Eleventy uses for collections and routing.
- Markdown output is semantic HTML, which Pico CSS styles without additional classes.
- Limited to what Markdown supports natively — complex layouts may need Nunjucks shortcodes or raw HTML inline.
- Easy to extend via markdown-it plugins (footnotes, table of contents, etc.) if needed later.
