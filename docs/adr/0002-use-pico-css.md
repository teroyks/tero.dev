# ADR-0002: Use Pico CSS as the CSS framework

## Status

Accepted

## Context

We want a lightweight, responsive, and accessible design without building all styles from scratch.
The site is content-heavy (blog),
so good typography and semantic HTML styling are important.
We also want built-in dark/light mode support.

## Decision

Use Pico CSS as the base CSS framework,
supplemented by custom vanilla CSS overrides where needed.

Alternatives considered:

- **Vanilla CSS only** — maximum control but more work for basics like resets, typography, and forms.
- **Sass/SCSS** — powerful features (mixins, partials) but adds a build dependency; modern CSS custom properties and nesting reduce the need for a preprocessor.
- **Tailwind CSS** — utility-first framework, fast to prototype with, but adds a build step, a Node dependency, and results in class-heavy HTML that conflicts with Markdown's clean semantic output.
- **Simple.css** (~4KB) — even smaller but no utility classes at all and fewer components.
- **Water.css** (~2KB) — too minimal; would need significant custom CSS for anything beyond basic content.
- **MVP.css** (~7KB) — more opinionated visual style, harder to customize.

## Consequences

- Good defaults for semantic HTML out of the box — Markdown-generated content looks good without adding classes.
- Built-in dark/light mode support via `data-theme` attribute.
- ~10KB gzipped added to the page weight.
- Optional classes available when needed, but not required for basic styling.
- Custom properties make overriding defaults straightforward.
