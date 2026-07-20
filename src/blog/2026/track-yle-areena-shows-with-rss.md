---
title: Track Yle Areena Shows With RSS
description: Get notifications when your favorite series has new episodes available.
date: 2026-07-20
tags:
  - javascript
  - browser
---

[Yle Areena](https://areena.yle.fi/) is the streaming service of the Finnish tv broadcast company. It is otherwise very nice but it isn't great at notifying you when new seasons or episodes are available to watch.

Luckily, they offer RSS feeds for most of the shows, so I can use that to my advantage: I can add the series I want to watch to my RSS reader.

To make things easier, I wrote a small bookmarklet to get the feed URL for a show. I open the show page, click on the bookmarklet, and get the URL on my clipboard, ready to be pasted to the feed aggregator (my favorite is [NetNewsWire](https://netnewswire.com)).

Here's the bookmarklet: copy and paste the code into a bookmark URL on your browser (tested with Safari on a Mac; probably should work elsewhere just fine):

```javascript
javascript:(function(){var%20m=location.pathname.match(/\/(\d+-\d+)/);if(!m){alert("Not%20an%20Yle%20Areena%20series%20page%20—%20no%20series%20ID%20found%20in%20the%20URL.");return;}var%20url="https://feeds.yle.fi/areena/v1/series/"+m[1]+".rss";navigator.clipboard.writeText(url).then(function(){alert("Copied:\n"+url);},function(){prompt("Copy%20this%20feed%20URL:",url);});})();
```

There's some (very crude) error handling that alerts you if the current page URL doesn't look right (e.g. if you accidentally clicked on the bookmarklet on some other site), and that shows the URL for manual copy (if the browser couldn't do it automatically).

A better-formatted version for readability:

```javascript
javascript:(function () {
  var m = location.pathname.match(/\/(\d+-\d+)/);
  if (!m) {
    alert("Not an Yle Areena series page — no series ID found in the URL.");
    return;
  }
  var url = "https://feeds.yle.fi/areena/v1/series/" + m[1] + ".rss";
  navigator.clipboard.writeText(url).then(
    function () {
      alert("Copied:\n" + url);
    },
    function () {
      prompt("Copy this feed URL:", url);
    }
  );
})();
```
