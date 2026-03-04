# ADR-0005: Use ES Modules (ESM)

## Status

Accepted

## Context

Eleventy 3.x supports CommonJS, ESM, and TypeScript for configuration and data files.
We need to choose a module system for the project.

Alternatives considered:

- **CommonJS** — the legacy Node.js module system (`require`/`module.exports`).
  Works fine but is the older approach with no advantage over ESM for a new project.
- **TypeScript** — adds type checking,
  but for a blog with a handful of config files and Nunjucks/Markdown templates,
  it introduces build complexity without meaningful benefit.

## Decision

Use ES Modules (ESM) with `"type": "module"` in `package.json`.
Eleventy 3.x has full native ESM support.
ESM is the modern JavaScript standard,
and some newer packages are ESM-only.

## Consequences

- Modern `import`/`export` syntax throughout config and data files.
- No extra build tooling required.
- Compatible with ESM-only packages.
- Aligns with the direction of the broader Node.js ecosystem.
