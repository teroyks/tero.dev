---
title: Never Add Packages to the System Python
description: Avoid messing up your Python configuration.
date: 2026-02-11
tags:
  - python
  - uv
---

If you use `pip`, it is all too easy to accidentally install packages to your system Python (just forget to activate a virtual environment before running `pip install`).

Messing with your system Python is not a good idea (and is likely to cause conflicts between your projects), but you can protect yourself from accidentally doing this by setting the environment variable `PIP_REQUIRE_VIRTUALENV`. For example, in your `.bash_profile`, include:

```bash
export PIP_REQUIRE_VIRTUALENV=true
```

This will make the installation fail unless you have an active virtual environment.

(My real recommendation would be to use [uv](https://docs.astral.sh/uv/) instead to handle your project dependencies---it enforces this by default.)
