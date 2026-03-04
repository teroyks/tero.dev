# ADR-0011: On-demand accessibility testing

## Status

Accepted

Supersedes ADR-0008

## Context

ADR-0008 integrated pa11y via Eleventy's `eleventy.after` event,
running accessibility checks automatically on every build.

This approach had several drawbacks:

- **Build time**: Added ~10 seconds to every build, slowing down the development feedback loop.
- **CI failures**: pa11y requires a headless browser, which failed in GitHub Actions due to Linux sandbox restrictions.
- **Diminishing returns**: Running checks on every build is overkill when content/structure changes infrequently.

Automated checks are still valuable, but they don't need to run on every single build.
Running them on-demand (before deploys, after significant changes) is sufficient.

## Decision

Move pa11y to an on-demand script rather than running it automatically.

- Create `scripts/check-accessibility.js` as a standalone script
- Add `npm run check:accessibility` and `just check-accessibility` commands
- Remove the `eleventy.after` hook from `eleventy.config.js`
- Skip accessibility checks in CI entirely

Developers can run accessibility checks manually when needed,
without blocking regular development builds or CI deployments.

## Consequences

- Builds are faster (no automatic pa11y checks).
- CI builds succeed without browser dependencies or sandbox workarounds.
- Accessibility checks are still available but require manual invocation.
- Developers must remember to run checks before significant changes are deployed.
  This is acceptable for a small site with infrequent updates.
- Could add `just check-accessibility` to a pre-push hook if needed in the future.
