---
title: Testing PWA on Safari
description: Make Safari reload a PWA with service worker.
date: 2026-04-14
tags:
  - mac
  - javascript
---
I’ve been building a small [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app) for myself. I wanted it to not reload the app on every start, so I’m using a standard service worker to cache the app locally.

The issue I ran into (yes, this is very 101—haven't had the need to build any before) was that the dev server also cached the app, and naturally did not show any updates I made. Clearing the network cache did nothing: apparently, you need to unregister the web app for the content to be reloaded. Chrome makes it easy, but I am using Safari, and things are [a bit more complicated](https://thevalleyofcode.com/lesson/pwa/unregister-service-workers-in-safari/).

1. In the _Develop → Service Workers_ menu, select _localhost_ to open the local service worker dev tool window.
2. Select the console tab.
3. Run the code (below) to unregister the worker.
4. In the Network tab, disable caches (maybe not necessary, but doesn't hurt).

```javascript
navigator.serviceWorker.getRegistrations()
.then(regs => {
  regs.forEach(r => {r.unregister()})
})
```

This will unregister the service worker so you can reload the app.

## Permanent Fix

Of course, having to do that is annoying and slow. Better to disable the service worker for the local development server.

In my `main.js`, the code that registered the service worker looked like this:

```javascript
if ('serviceWorker' in navigator) {
  // register the worker
}
```

So I just changed that to ignore the local address:

```javascript
const isDevServer = () =>
  ['localhost', '127.0.0.1'].includes(location.hostname);

if ('serviceWorker' in navigator && !isDevServer()) {
  // register the worker
}
```

After restarting the dev server (and also unregistering the existing service worker, see above), the local development server now does not use the worker to cache the app. (Probably should have done this from the beginning, but hey—building a first PWA here.)
