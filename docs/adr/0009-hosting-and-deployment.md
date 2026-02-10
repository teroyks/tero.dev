# ADR-0009: Host on GitHub Pages with automated deployment via Actions

## Status

Accepted

## Context

The static site needs to be hosted and deployed.
Ideally, deployment should be automatic on code changes.

Alternatives considered:

- **GitHub Pages with Actions** — free, integrated with GitHub code repository.
  Automatic deployment via workflows. Good CI/CD features.
- **Netlify** (or similar providers) — good for static sites,
  usually integrate with GitHub, automatic deployment.
  Easy to set up. May incur costs as (if) the site grows.
- **Shared hosting** — traditional web hosting. Requires manual deployment or custom scripts.
  Less convenient, more maintenance overhead.
- **Codeberg** — privacy-focused Git hosting. Not ideal for websites.
  CI/CD features are limited. Intended for open-source projects.
- **Self-hosted** — full control, maximum privacy. Requires server setup, maintenance, and ongoing costs.
  Too much operational overhead at this stage.

## Decision

Host the site on GitHub Pages and deploy automatically via GitHub Actions;
this feeds two birds with one scone.
Deployment is triggered on every push to main.

This approach is free, requires minimal setup, and leverages GitHub's native features.

## Consequences

- Code and hosting are tightly coupled on GitHub.
  If GitHub becomes unavailable or the account is compromised, both are affected.
  Nothing will be lost, as there is a local copy of the code repository,
  and deploying somewhere else is trivial.
- GitHub Pages deployments are fast and reliable.
- Custom domain setup is straightforward.
- No additional services or accounts needed.
- Free tier has no cost or bandwidth limits for public repositories,
  keeping the repo publis is ok for this project:
  the content will be public anyway,
  and there is nothing secret about the configuration.
- Scaling to other platforms later is possible:
  would only require reconfiguring DNS and deployment.
- Actions workflows allow future CI/CD expansion
  (e.g., adding linting, testing, or other checks before deployment)
  if needed. Not very likely for a humble website.
