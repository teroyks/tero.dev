---
title: Exclude Files from Git
description: Exclude files without touching .gitignore
date: 2026-02-11
tags:
  - git
  - bash
---

Excluding files from your Git repository is normally done by adding them to the `.gitignore` file.
However, sometimes you want to exclude files without touching `.gitignore`
(for example, if you have some local configuration files or scripts that you don't want to commit
but don't want to---or can't---add to the official project ignore file either).

You can ignore local changes to tracked files by using the [`git update-index` command](https://git-scm.com/docs/git-update-index) with the `--assume-unchanged` option.
But some files you don't want to add to the repository at all.

These files you can add to the `.git/info/exclude` file.
It is not tracked by Git, so it won't be included in your repository,
but things added there will be ignored by Git just the same.

I do this quite often (for example, I have a local `justfile` with my own scripts that should not be committed),
so I wrote the following shell script to help with the task.

```bash
#!/usr/bin/env bash
# git-exclude
# Exclude file pattern locally (without touching .gitignore)

set -e  # exit on non-zero exit status
set -u  # error on unset variables or parameters
set -o pipefail  # set pipeline return value to last non-zero status

GIT_ROOT=$(git rev-parse --show-toplevel)
EXCLUDE_FILE="$GIT_ROOT/.git/info/exclude"

if [[ ! -f "$EXCLUDE_FILE" ]]; then
  touch "$EXCLUDE_FILE"
fi

if [[ -n ${1:-} ]]; then
    if grep --quiet "^$1$" "$EXCLUDE_FILE"; then
        echo "Already excluded: $1"
    else
      echo "$1" >> "$EXCLUDE_FILE"
    fi
else
    echo "Usage: git exclude <pattern>" >&2
    exit 1
fi
```

If you save this file as `git-exclude` somewhere in your path,
you can then use it as a Git "add-on" to exclude files locally.

```shell
# tell Git to ignore 'justfile'
git exclude justfile
```

If the exclude file doesn't exist, it will be created automatically.
And the script only adds new patterns to the file (avoids duplicates).

I mostly add individual files to the list,
but you can use the same file matching patterns as you would with `.gitignore`.

If you want a more thorough explanation of the different ignore files,
Marijke Luttekes [has a good post](https://marijkeluttekes.dev/blog/articles/2025/09/03/git-exclude-a-handy-feature-you-might-not-know-about/) on the subject.
