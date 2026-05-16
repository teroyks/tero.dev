---
title: Exclude node_modules from Time Machine
description: Do not back up all your various node_modules directories.
date: 2026-05-16
tags:
  - command-line
  - javascript
  - mac
---
A quick tip I came across: if you tinker with lots of JavaScript projects, you probably have a huge amount of `node_modules` directories which accumulate lots of files (that are also updated quite often). On a Mac, backing these up with Time Machine can consume lots of time (and disc space), and is not useful.

You can exclude folders in Time Machine’s settings, but it also comes with a command-line utility, `tmutil`, which is very convenient for something like this.

So, my process for setting up a JavaScript project now includes this, right after I have run the first `npm install` (or whatever package manager the project is using) command:

```shell
tmutil addexclusion node_modules
```
