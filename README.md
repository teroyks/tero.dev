# tero.dev

A personal blog built with Eleventy.

## Development

Set up a fresh clone with [just](https://github.com/casey/just):

```sh
just init-dev
```

That installs the npm dependencies and the commit hooks.
Run `just` on its own to list every recipe.

- `just start` — dev server at <http://localhost:8080>
- `just build` — build the site into `_site/`
- `just new-post "Title"` — create a post under `src/blog/YYYY/`

## Checks

HTML and JSON output are validated on every build,
so `just build` reports invalid markup or a broken feed as it writes the files.

Two checks run separately:

- `just check-frontmatter` — flags posts with an empty tag or a missing description
- `just check-accessibility` — runs pa11y over `_site/`, so build first (slow, see [ADR-0011](docs/adr/0011-on-demand-accessibility-testing.md))

## Commit hooks

Hooks are managed with [prek](https://github.com/j178/prek)
and configured in `.pre-commit-config.yaml`:
rumdl lints and formats staged Markdown,
and `check-frontmatter` runs against staged posts.

Hooks are installed per clone,
so a fresh clone needs `just init-dev` (or `prek install`) before they run.

## Design decisions

Architecture Decision Records are kept in [docs/adr/](docs/adr/).
