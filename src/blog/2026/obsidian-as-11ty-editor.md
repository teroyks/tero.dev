---
title: Obsidian as Content Editor for Eleventy
description: Make two of my favorite applications play nice together.
date: 2026-02-20
tags:
  - meta
  - obsidian
  - eleventy
  - markdown
---
I have been using [Obsidian](https://obsidian.md) since pretty much the first alpha release. It was quite rough at first, but still useful, and it's gotten a lot better along the way---I find myself using it more and more for various purposes that mainly revolve around text-shaped data.

Since Obsidian and Eleventy (which runs this site) both deal with content in Markdown, I wanted to see if they could play nice together so that I could edit my content in Obsidian. I created a vault for the site, and linked Eleventy's `src` directory under it. (I did not want to go all in and require Obsidian, so this keeps the two nicely separate.)

## Links

One of the strengths of Obsidian is how easy it is to link notes together. This is something that I hope will be useful one day (because it will then mean I have enough posts here worth linking to). Making a link by just typing \[\[, and getting auto-completion for pages and posts is a lovely user experience. But, of course, the Obsidian-specific links are not in any standard format, so something needs to be done about them before publishing the site.

If you're ok with always managing the site with Obsidian, there are plugins to handle this on Eleventy's end (such as [eleventy-plugin-interlinker](https://github.com/photogabble/eleventy-plugin-interlinker)). I didn't want to use those, since my goal was to keep the two separate. So, I wrote a [small plugin](https://codeberg.org/tero/obsidian-markdown-links) to convert the links in Obsidian to the correct format (basic Markdown and Eleventy’s published format are both supported). Now I can write a `[[hello-world]]` link in Obsidian and have a working link in the published post. At the moment, the links point to the published resource, but this can probably be improved by using Eleventy features (template format, or a shortcode).

(There are existing options, such as [obsidian-link-converter](https://github.com/ozntel/obsidian-link-converter), that already do this and more, but I didn't want to sift through them to see if they do what I want, the way I want.)

## Metadata

Adding metadata, such as a post date or tags, is very easy to do in Obsidian. Especially for tags: instead of having to manually manage a list of tags I use, Obsidian recognizes the `tags` keyword in the page frontmatter, and offers to fill in values from the tags I have used on other posts. Which is nice.

## Little Things

There are other small niceties I get from using Obsidian as the editor, such as:

- creating external Markdown links by just pasting a URL over selected text
- a very good Markdown experience with formatting, lists, etc.
- writing in either source mode or with a live preview
- Vim editing mode
- easily adjusting the look and feel to my liking (I'm currently using the [Typewriter](https://github.com/crashmoney/obsidian-typewriter) theme for my site content vault)
- a possibility to add features with plugins later if I want them

## Post Template

What ties everything together is a post template. I can just choose _Create new note from template_ from the command palette, and I get a post draft with the frontmatter already pre-filled (and the file name automatically created from the post title). I use the [Templater plugin](https://silentvoid13.github.io/Templater/) to achieve this – it creates the note, slugifies the title, and saves the note in the right directory, making creating new posts effortless. (Does not help with writing the actual content, though.)

This is the template I'm currently using. It is extremely simple, and will probably go through many changes in the future, but it works just fine for my current needs.

```javascript
<%*
const title = await tp.system.prompt("Title");
const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
const year = tp.date.now("YYYY");
await tp.file.move(`blog/${year}/${slug}`);
-%>
---
title: <% title %>
description: .
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  -
---
```

The lines between `<%*` and `-%>` are instructions for Templater that are run when this template is applied to a post. (The hyphen in the end tag is for [whitespace control](https://silentvoid13.github.io/Templater/commands/whitespace-control.html): it is necessary because otherwise, processing the Templater commands would leave an empty line in the beginning of the template which would prevent the frontmatter from working.)

Here's what the templater commands do:

- `title`: Asks for the post title in a dialog.
- `slug`: Creates a version of the post title suitable for a file name.
- `year`: Determines the current year (which is how I organize my posts).
- `await`: This line moves the new post under the directory for current year, `blog/YYYY`, and changes its name to the slug.

The frontmatter is pretty standard Eleventy post metadata with some Templater instructions to insert default values for the post title and current date.
