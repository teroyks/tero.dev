---
title: Flush DNS Cache on macOS
description: Sometimes fixes spotty internet–caused loading issues.
date: 2026-02-16
tags:
  - mac
---
My internet connection can sometimes be quite spotty (giving Telia the side-eye). It comes back, but unfortunately macOS may already have stored the “sorry, I don’t see anything there” state, which means the site won’t load even after the glorious internet comes back.

The solution: manually flush the DNS cache (note: requires running as administrator). Here’s how to do that on a Mac:

```shell
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
```

After this, reloading a page should work (provided the connection wasn’t dropped again…)
