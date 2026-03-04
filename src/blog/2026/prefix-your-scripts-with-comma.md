---
title: Prefix Your Scripts with Comma
description: Name your helper scripts so they are nicer to run.
date: 2026-02-17
tags:
  - command-line
---
Something [I picked up](https://notes.hamatti.org/technology/recipes/pesky-little-scripts) from my friend Juhis: I've recently started prefixing my helper scripts and command-line functions with a comma. I have long used context-specific prefixes for different things, but those generic little helpers did not have a common prefix.

I'm not gonna lie—it still feels kind of wrong to have a comma in a script name. But I'm getting over it: it is very handy to type a comma, followed by a tab, and get a list of helper scripts to run. Now I can run things like,

```shell
,notify "a message to send myself"
```

and I don't have to remember if `notify` is some installed app. I know for sure that `,notify` is something I've made for myself.
