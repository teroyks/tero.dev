---
title: List Outdated uv Tools
description: Find out if some of your installed tools need updating.
date: 2026-07-29
tags:
  - python
  - uv
  - command-line
---

[uv] is a good way to install Python-based tools (using `uv tool install`). but---if you're like me---you'll start accumulating these quite fast, and will probably want to upgrade things to new(er) versions.

`uv tool list` shows all the packages you have but doesn't tell you if newer versions are available. I used to have a custom script for doing this, but since earlier this year, an option was added to list outdated tool packages:

```shell
uv tool list --outdated
```

This will give you a handy list of installed tools, and current and available versions. If you don't want to live on the bleeding edge, but instead want to hold off for a couple of days before installing new versions, this is also supported:

```shell
uv tool list --outdated --exclude-newer='3 days'
```

Updating these is also simple. (Instead of `--all`, you can also just mention a name of a package you want to upgrade.)

```shell
uv tool upgrade --all --exclude-newer='3 days'
```

[uv]: https://docs.astral.sh/uv/
