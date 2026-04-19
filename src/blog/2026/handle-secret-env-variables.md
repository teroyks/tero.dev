---
title: Handle Secrets with mise and 1Password
description: Manage secret environment variables automatically.
date: 2026-04-17
tags:
  -
---
_Note: There are more sophisticated ways of managing secrets than environment variables. If you need—or already have—that, this is not for you._

A common way of managing secret or semi-secret information, such as API tokens, is having them in environment variables. It's not the safest way, but it is relatively simple, and secure enough for many purposes.

Putting environment configs in a `.env` file is a common practice. However, it has a couple of shortcomings you need to account for:

1. You don't want to accidentally commit this data to your repository.
2. It would be preferable not to have sensitive information stored in plaintext files.

## Misery Loves Convenience

Using [mise] is a handy way to (among many other features) take care of your environment automatically: it can add (and remove) environment variables based on your current directory. You configure a mise environment by adding variables to your `mise.toml` file:

```ini
[env]
MY_VAR = "variable value"
```

(Actually, I recommend putting your personal, project-specific tokens and such in `mise.local.toml` instead, so you can use `mise.toml` for things shared by everyone using the project.)

But even if you add the mise config file to your project ignore file (taking care of the first issue), you will still have sensitive data in a plaintext file.

## 1Password to Rule Them All

[1Password] is one of the most commonly-used password and secrets managers, available on many platforms (although this particular technique only works—at least at the time of writing—only on Linux and macOS). It has a beta feature for handling environments that works nicely together with mise.

What you need to do in 1Password:

1. Activate _1Password Developer experience_ in the settings.
2. Select _Developer > Environments > View Environments_.
3. Create a new environment.
4. Add your environment variables.
5. Select the _Destinations_ tab and then _New destination_.
6. Choose _Local .env file_ as the destination to configure.
7. Choose a file path (point to your project directory) and `.env` as the file name.
8. Click on _Mount .env file_ to "add" it to the chosen directory.

What this does: 1Password creates a "virtual" `.env` file that contains your variables in your chosen directory. This file does not actually exist, so it cannot be accidentally committed to a repository, and also it is not viewable unless you activate 1Password (no plain text data saved).

Next, you need to tell mise to use this data in the project environment. Add this to your `mise.local.toml`:

```ini
[env]
_.file = ".env"
```

On entering the directory, mise will now activate your environment and set the variables from your 1password-managed environment.

[1Password]: https://1password.com
[mise]: https://mise.jdx.dev
