# ADR-0012: Accept application/json as the feed content type

## Status

Accepted

## Context

ADR-0007 chose JSON Feed for syndication.
The JSON Feed specification recommends serving feeds as `application/feed+json`,
which on Apache is arranged with a `ForceType` directive in `.htaccess`.

ADR-0009 hosts the site on GitHub Pages,
which picks the content type from the file extension
and offers no way to override response headers —
no `.htaccess`, no header configuration of any kind.

Alternatives considered:

- **Move to a host that allows custom headers** —
  solves a cosmetic problem at the cost of the deployment setup in ADR-0009.
- **Serve the feed from a path without a `.json` extension** —
  GitHub Pages would still pick the type from the extension,
  trading one wrong type for another.

## Decision

Accept `application/json` as the content type of `/feed.json`.

Feed discovery does not depend on the response header.
The `<link>` element in the page head declares the correct type,
and readers use that when subscribing:

```html
<link rel="alternate" type="application/feed+json" href="/feed.json" />
```

## Consequences

- Nothing to maintain: no `.htaccess`, no header configuration, no change of host.
- A reader that requires `application/feed+json` in the response itself would reject the feed.
  No common reader is known to do this.
- The limitation is written down,
  so it does not have to be rediscovered the next time the feed is worked on.
- Moving to a host with header control would allow revisiting this,
  and would not require any change to the feed itself.
