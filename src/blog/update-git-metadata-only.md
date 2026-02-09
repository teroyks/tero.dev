---
title: Git – Update Only Metadata
description: How to update only metadata in a Git repository.
date: 2026-02-09
tags: git
---

A handy tip I picked up a while ago:
if you need to push something to a remote repository,
without updating the actual content
(for example, to trigger a CI/CD pipeline),
you can update the timestamp and author of the latest commit
using the following command, and then push it:

```shell
git commit --amend --reset-author
```
