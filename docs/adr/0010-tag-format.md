# ADR-0010: Lowercase tags with dashes

## Status

Accepted

## Context

Articles can be categorized with tags for finding related posts more easily. Tags can be shown as links on posts, and they are included in URLs.

Alternatives considered:

- **Natural tags**: Use sentence case, and separate words in multi-word tags.
- **Lowercase**: Often, tags are presented all lowercase. This is a format people are used to in this context.
- **Joined Words**: Sometimes, multiple words are just mashed together in tags. This makes all tags word-like, but can also impede readability (especially with accessibility tools).
- **Tag-separated**: Instead of spaces between words, a separator character such as a dash or an underscore is often used, or tags can be wiki-style, with camel-cased words.

## Decision

Use all lowercase tags, with dashes between words (e.g. `example-tag`). This makes them look tag-like, keeps link and URL generation easier (no specific encoding needed), results in cleaner URLs, and also keeps the readability good (compared to mashing words together).

## Consequences

- With Nunjucks, a tag with dashes needs to be referenced with square brackets notation.
- Lowercasing acronyms may impede readability and accessibility – this decision can be revisited if that turns out to be the case.
