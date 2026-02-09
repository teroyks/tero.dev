# ADR-0006: Site structure and URL scheme

## Status

Accepted

## Context

The site is a personal blog with minimal pages.
We need a directory structure for the Eleventy source files
and a URL scheme for the published site.

## Decision

Use `src/` as the Eleventy input directory with the following structure:

```text
src/
├── _data/
├── _includes/
│   └── layouts/
│       └── base.njk
├── blog/
│   ├── blog.json
│   └── *.md
├── css/
│   └── style.css
├── about.md
└── index.njk
```

URL scheme:

- `/` — homepage, shows a list of recent blog posts
- `/blog/YYYY/post-slug/` — blog posts, with the year in the URL
- `/about/` — about page

The year is included in blog post URLs for two reasons:
the year avoids slug collisions when revisiting an old subject,
and it gives the reader an immediate hint about the age of the post.

I expect not to be posting very frequently,
so more granular URLs are not necessary.

## Consequences

- Clean, predictable URLs with chronological context.
- Homepage doubles as the blog listing — no separate `/blog/` index needed.
- The `blog.json` directory data file sets the permalink pattern, layout, and tags for all posts in one place.
- Adding new top-level pages (e.g. `/projects/`) is straightforward — just add a new file or directory in `src/`.
