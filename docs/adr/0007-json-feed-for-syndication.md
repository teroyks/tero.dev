# ADR-0007: Use JSON Feed for syndication

## Status

Accepted

## Context

The blog should have a syndication feed for subscribing to posts.
The main feed format options are RSS 2.0, Atom, and JSON Feed.

Alternatives considered:

- **RSS/Atom** — universal support in feed readers and aggregators.
  XML-based, more verbose. Eleventy has an official plugin (`@11ty/eleventy-plugin-rss`).
- **Both RSS/Atom and JSON Feed** — maximum compatibility,
  but more to maintain for a small personal blog.

## Decision

Offer only a JSON Feed for now.
JSON Feed is simple to generate (just a Nunjucks template outputting JSON, no plugin needed),
easy to read and debug,
and supported by most modern feed readers.

RSS/Atom can be added later if there is demand.

## Consequences

- No additional dependencies — the feed is a plain Nunjucks template.
- Some older feed readers and aggregators may not support JSON Feed.
- The feed includes full post content, not just excerpts.
- Adding RSS/Atom later is straightforward and does not affect the existing JSON Feed.
