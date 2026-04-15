---
title: Upgrading PostgreSQL
description: Upgrading my old PostgreSQL server to version 17.
date: 2026-04-15
tags:
  - mac
  - command-line
  - postgres
---
My old [PostgreSQL](https://www.postgresql.org) development server was starting to crack at the seams,
so it was time to upgrade.
Which is scary!
You cannot just update the server,
you need to migrate the data—and it is very useful to know what you are doing.
(Following someone else's notes is the next best thing.)

So, these are my notes on how I managed an upgrade without any issues
(so far 🤞).

## Prerequisites and Preparation

I decided to upgrade to version 17 instead of the latest 18
since I wanted minimal hassle,
and versions 14 and 17 are directly compatible
(version 18 has checksums enabled by default:
shouldn't be an issue but it is one more step to take care of
so I decided to leave that for later).

I'm using a Mac,
and PostgreSQL is installed with [Homebrew](https://brew.sh).
I use [Fish](https://fishshell.com) as my shell,
so that's what the commands are for
(you need to adjust some of them a bit to use on Bash/Zsh/whatever).

### Backing Up

The first thing to do before touching anything,
is to back up the old database,
in case something goes horribly wrong.

You can list the databases on the server with:

```shell
psql --list
```

Decide what you want to back up.
The first step I took was to dump my database,
let's call it `tero-test`,
by dumping it to a file:

```shell
pg_dump tero-test > tero-test.sql
```

This creates a file that can be used to restore both the database structure and its contents
(see [the docs](https://www.postgresql.org/docs/current/backup-dump.html) for more info).

You can also just do a file backup of the old data,
_but don't try to do this while the server is still running!_
For this, you need to find out where the data is actually stored.
You can check this with `psql`
(if you don't have a default database,
you need to give it a working database name):

```shell
psql tero-test --command 'show data_directory'
```

This tells me my data directory is `/opt/homebrew/var/postgresql@14`.

You can also look for the data directory of any installed PostgreSQL version with Homebrew:

```shell
brew info postgresql@14
```

(Look for the `initdb` command in the output,
or the `-D` option on the info for starting the database.)

### Installation and Shutdown

Next, I installed a new version alongside the old one,
and stopped the old one:

```shell
brew install postgresql@17
brew services stop postgresql@14
```

After stopping the old database,
you can take a file backup if you want.
For example, create a `tar` archive of the whole directory:

```shell
tar cvfz postgresql-14.tgz /opt/homebrew/var/postgresql@14
```

## Migration

Now for the actual migration.
[Matt Brictson's article](https://mattbrictson.com/blog/postgres-17-homebrew) was very helpful here.

First, it's a good idea to do a dry run to check everything is ok (lowercase options point to the old executable and data directories, and uppercase ones to the new version):

```shell
set BREW_CMD (brew --prefix)
$BREW_CMD/opt/postgresql@17/bin/pg_upgrade \
    -b $BREW_CMD/opt/postgresql@14/bin \
    -B $BREW_CMD/opt/postgresql@17/bin \
    -d $BREW_CMD/var/postgresql@14 \
    -D $BREW_CMD/var/postgresql@17 \
    --check
```

(You can also just see what `brew --prefix` points to,
and use the path instead of `$BREW_CMD`,
but this was a little bit shorter.)

If everything is good,
the dry run command should say,
_Clusters are compatible_.
You can then do the actual migration by re-running the command without the `--check` option:

```shell
$BREW_CMD/opt/postgresql@17/bin/pg_upgrade \
    -b $BREW_CMD/opt/postgresql@14/bin \
    -B $BREW_CMD/opt/postgresql@17/bin \
    -d $BREW_CMD/var/postgresql@14 \
    -D $BREW_CMD/var/postgresql@17
```

You now have a migrated database!
`pg_upgrade` gives you some suggestions on what to do next
(such as optimizing the new database),
but any commands like `vacuumdb` need to wait until you've activated the new server.
You also get a script created for you that will remove the old database cluster
(but that can wait until you've confirmed things are working as they should).

Switch your system to the new database:

```shell
brew unlink postgresql@14
brew link postgresql@17

# psql should now report you're using version 17
psql --version
```

You can start the new server:

```shell
brew services restart postgresql@17

# verify the server is accepting connections
pg_isready
```

That's it!
You have successfully migrated your database to a new version.
All your databases and data were carried over.

## End Notes

You can now run the `vacuumdb` or other commands that `pg_upgrade` recommended.

To be sure my commands ran just the way I want,
and that the process is repeatable, here is my [justfile](https://github.com/casey/just) for the migrations
(the syntax of the command in the recipe is slightly different from that we ran on the command line):

{% raw %}

```shell
BREW_CMD := `brew --prefix`

# dry-run migration from 14 to 17, should report clusters compatible
dry-run-migration-to-17:
    {{BREW_CMD}}/opt/postgresql@17/bin/pg_upgrade \
          -b {{BREW_CMD}}/opt/postgresql@14/bin \
          -B {{BREW_CMD}}/opt/postgresql@17/bin \
          -d {{BREW_CMD}}/var/postgresql@14 \
          -D {{BREW_CMD}}/var/postgresql@17 \
          --check

# migrate database
migrate-14-to-17:
    {{BREW_CMD}}/opt/postgresql@17/bin/pg_upgrade \
          -b {{BREW_CMD}}/opt/postgresql@14/bin \
          -B {{BREW_CMD}}/opt/postgresql@17/bin \
          -d {{BREW_CMD}}/var/postgresql@14 \
          -D {{BREW_CMD}}/var/postgresql@17
```

{% endraw %}
