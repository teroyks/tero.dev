---
title: Trusting Homebrew Packages
description: What to do when new Homebrew lacks trust in your choices.
date: 2026-06-15
tags:
  - mac
  - homebrew
---

Homebrew 6 introduced a new concept: [tap trust](https://docs.brew.sh/Tap-Trust). It means it can warn you about non-official taps you're trying to install.

When you run `brew doctor`, it lets you know if there are untrusted taps:

```shell
Warning: The following taps are not trusted:
  unofficial-user/unofficial-tap-name
```

You can also list the untrusted taps and formulas with `brew untrust`:

```shell
Untrusted taps:
  unofficial-user/unofficial-tap-name
Untrusted formulae:
  unofficial-user/unofficial-tap-name/formula-name
```

If you trust the maker, you can trust the formula with:

```shell
brew trust --formula unofficial-user/unofficial-tap-name/formula-name
```

(You can also trust the whole tap, but it's usually better to narrow the trust down to just the formulas you want.)

If you decide you don't need to trust a formula or a tap (maybe it's something you installed to test something you don't actively use any more), you can uninstall a formula with:

```shell
brew uninstall formula-name
```

or even remove the whole tap:

```shell
brew untap unofficial-user/unofficial-tap-name
```
