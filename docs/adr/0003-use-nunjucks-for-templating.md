# ADR-0003: Use Nunjucks for templating

## Status

Accepted

## Context

Eleventy supports multiple templating languages.
We need one for layouts and reusable components.
The site is blog-focused,
so most content is Markdown — templates are mainly used for layouts, post listings, and navigation.

Alternatives considered:

- **JSX (via Preact or custom transform)** — familiar component model, but requires extra build configuration, fewer community examples, and ongoing friction with Eleventy's shortcode/plugin ecosystem.
- **WebC** — Eleventy-native single-file components, but smaller ecosystem and less documentation.
- **Liquid** — simpler but more limited than Nunjucks.

## Decision

Use Nunjucks for layouts and page templates.
It has the best Eleventy ecosystem support,
the most community examples,
and sufficient component-like features via macros and includes.

## Consequences

- Widest selection of tutorials, examples, and plugin documentation.
- Macros and includes provide basic component reuse, though less elegant than JSX.
- No type checking in templates — errors surface at build time, not in the editor.
- Straightforward to swap later if needed, since templates are a thin layer over Markdown content.
