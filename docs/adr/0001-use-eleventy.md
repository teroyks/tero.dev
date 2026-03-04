# ADR-0001: Use Eleventy as the static site generator

## Status

Accepted

## Context

We need a static site generator for a personal blog-focused website.
The site should be lightweight, responsive, and accessible.
We want minimal client-side JavaScript and fast build times.

## Decision

Use Eleventy (11ty) version 3.x.
It ships zero client-side JavaScript by default,
has a flexible plugin ecosystem,
and supports multiple templating languages.
It also has a good community,
including friends who use it and can offer advice.

Alternatives considered:

- **Static HTML** — too cumbersome to create everything from scratch without any templating or content pipeline.
- **Hugo** — very fast and versatile, but probably too complex for this project.
- **Python-based SSGs** (Pelican, MkDocs, Sphinx, etc.) — tend to be geared more towards code documentation than personal blogs.
- **CMS (e.g. Wagtail)** — not necessary for a small site; would require more complex hosting and maintenance.

## Consequences

- Fast builds and zero JS bundle shipped to the browser by default.
- Large community and plugin ecosystem for common blog features (RSS, syntax highlighting, image optimization).
- Requires Node.js as a development dependency.
- Less "batteries included" than frameworks like Astro or Next.js — more manual setup for advanced features.
