---
title: Open Unsigned Mac App
description: Tell macOS, “Trust me, I know what I’m doing.”
date: 2026-03-19
tags:
  - mac
---
By default, current macOS does not allow opening apps that haven’t been officially signed. If you try opening an app normally, you get an error message saying, “[App name] not opened—Apple could not verify [App name] is free of malware,” and the only options you get is to close the message, or move the app to trash.  This is a measure intended to stave off malware, but sometimes you trust the developer and just want to open their app without forcing them to jump through security hoops for you.

## Trust Me, Bro

In the terminal, you can tell your mac to allow an unsigned app with the following command (you need the full path for the app, in this example it’s called `MyApp.app`, and it is in the `Applications` folder):

```shell
xattr -r com.apple.quarantine /Applications/MyApp.app
```

If you don’t want to deal with the command line, you can also allow opening the app in your System Settings: go to _Privacy & Security_; You should find a notification there saying, “MyApp.app was blocked to protect your Mac,” with a button that says, _Open Anyway_. This will create an exception for the app, allowing you to open it normally.

## My Way

I like doing things on the command line, but this is something I do so seldomly that I don’t remember the command offhand. So, a function to the rescue:

```bash
function ,allow-open-without-quarantine --argument-names file_path --description 'Remove quarantine from an unsigned app'
    if test -z "$file_path"
        echo "Usage: ,allow-open-without-quarantine PATH_TO_APP"
        return
    end
    if ! test -e $file_path
        echo "File not found: $file_path" >&2
        return 1
    end

    xattr -d com.apple.quarantine $file_path
end
```

This is a simple [Fish](https://fishshell.com) function with some basic sanity checks (command line argument is given and points to an existing file), and then the `xattr` command that removes the quarantine from the app.

Now, all I need to do is to remember a part of the function (I can type a comma, followed by a part of the name—for example, any of `,allow`, `,open`, or `,quarantine` will do) and press `Tab`, and it expands to my function name, ready to do my bidding and let me open this unsigned and potentially _very dangerous_ app.
