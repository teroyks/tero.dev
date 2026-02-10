# ADR-0008: Automated accessibility testing with pa11y

## Status

Accepted

## Context

The site should be accessible to all users.
Automated testing can catch common accessibility issues during development.

Alternatives considered:

- **axe-core** — powerful, widely-used, can be used with multiple runners (axe, htmlcs).
  Requires integration via a wrapper library.
- **Lighthouse** — broader scope (performance, SEO, best practices, accessibility).
  Overkill for accessibility-only testing; slower to run.
- **WAVE API** — web-based, requires network access.
  Not suitable for local development.
- **Integration approach: per-template (addLinter)** — runs on each template as it renders.
  Fast, incremental. But requires HTML to be fully rendered, limiting usefulness.
- **Integration approach: full-site after build (eleventy.after)** — scans all HTML files after build.
  Catches issues in final output. Slower as the site grows.

## Decision

Use pa11y with the htmlcs runner, integrated via Eleventy's `eleventy.after` event.
Run accessibility checks on all HTML files after every build.

pa11y is lightweight, easy to integrate, and provides clear, actionable error messages.
The htmlcs runner covers WCAG 2.1 issues comprehensively.

## Consequences

- At least some accessibility issues are caught automatically during development.
- All HTML files are rescanned on every build, regardless of changes.
  This is acceptable for a small site but may need optimization later.
- Build time increases slightly (currently ~8 seconds total, negligible).
- As the site grows (hundreds of pages), full-site scanning may become slow.
  At that point, consider switching to per-template checking or caching results by file hash.
- pa11y runs locally without network access; issues are reported at build time.
