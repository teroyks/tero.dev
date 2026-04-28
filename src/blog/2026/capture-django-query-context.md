---
title: Capture Django Query Context
description: Get the query context when testing Django.
date: 2026-04-28
tags:
  - python
  - django
  - testing
---
I'm writing this down because it came in very handy recently when testing a Django queryset, and I seem to have a hard time remembering this feature exists.

In `django.test.utils`, there is a `CaptureQueriesContext` context manager which enables you to fetch the context for a query. (My latest use case was to verify that some additional constraints in a queryset did not result in an N+1 query.)

Justin Thurman [has a good example](https://til.justinthurman.dev/about-capturequeriescontext):

```python
from django.db import connection
from django.test.utils import CaptureQueriesContext

def test_foo():
  with CaptureQueriesContext(connection) as ctx:
    # run some SQL queries
    print(ctx.captured_queries)
    # run assertions after printing if you want to guarantee that print fires
```
