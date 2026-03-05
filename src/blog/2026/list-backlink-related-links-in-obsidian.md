---
title: List Backlink-related Links in Obsidian
description: Listing pages that are linked to in relation with links to current page. (Not really as complicated as it sounds.)
date: 2026-03-05
tags:
  - obsidian
  - javascript
---
I have an [Obsidian](https://obsidian.md/) vault for noting down all kinds of miscellaneous things. Sometimes, I want to collect a list of notes linked to in relation to another note. For example, say I have a note called `book purchase`, and I might mention it in a note, saying something like,

> `Made a [[book purchase]] today: got [[The Incandescent]] by Emily Tesh. It is a lovely book!`

On my _book purchase_ note, it would be nice to list all the books I have mentioned purchasing. (This is a fictional example, and not an indicator that I have a book-buying problem. Honest! Although you too should buy [The Incandescent](https://app.thestorygraph.com/books/e6ba3476-b6bd-48ef-a59b-e8136286f33c)—it is really good!)

[Dataview plugin](https://blacksmithgu.github.io/obsidian-dataview/) to the rescue! More specifically, its JavaScript API which allows running inline JavaScript to further handle the data fetched by the plugin.

This is what I ended with:

```javascript
const currentPage = dv.current().file.name;
const linkRegex = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g;
const mentionsCurrent = line =>
  line.includes(`[[${currentPage}]]`)
  || line.includes(`[[${currentPage}|`);
const matchedLink = matches => matches[1];
const linkedPages = line => [...line.matchAll(linkRegex)].map(matchedLink)
const notCurrentPage = link => link !== currentPage;

const results = [...new Set(
  (await Promise.all(
    dv.pages(`[[${currentPage}]]`).map(async page => {
      const content = await dv.io.load(page.file.path);
      return content.split(/\n/)
        .filter(mentionsCurrent)
        .flatMap(linkedPages)
        .filter(notCurrentPage);
    })
  )).flat()
)];

dv.list(results.map(l => dv.fileLink(l)).toSorted());
```

What the script does:

- Uses Dataview functions to fetch the current note name, a list of notes that link to the current note, and the content of those pages.
- It then filters in only the lines that contain a link to the current note.
- From those lines, it gets all the links to notes (except the link to the current note) and flattens them to a single list.
  - This means that if note A links to `Zoo City` and `Usagi Yojimbo`, and note B links to `Rogue Protocol`, they go to one list, `['Zoo City', 'Usagi Yojimbo', 'Rogue Protocol']` instead of a list-of-lists.
- It creates a Set of unique note names.
- And finally, uses Dataview functions again to create a list of note links.

You can insert the code block above directly on the Obsidian note (just surround it with a code block that tells Obsidian to pass it to Dataview):

````javascript
```dataviewjs
// the code here
```
````

The result is a very nice, alphabetically sorted list of book purchases on the page.

Is there room for improvement? Sure. For example, this script does not categorize the links in any way. So for example, if my note also mentions the author, and the store I bought the book from, those will also be included in the list. But I don't really mind that: this works pretty well for the simple "these things I mentioned together with book purchases" (again, a _totally fictional_ example) purposes.
