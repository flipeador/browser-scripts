# Full Emoji Support For All Websites

Emoji are pictographs (pictorial symbols) that are typically presented in a colorful form and used inline in text.
They represent things such as faces, weather, vehicles and buildings, food and drink, animals and plants,
or icons that represent emotions, feelings, or activities.

Render all emoji symbols and sequences in the browser, as specified in the [Unicode®︎ Technical Standard #51][uts51].

By default, the script uses the [Noto Color Emoji][nce] font to display emojis.
You can enable de use of **emoji images** from the [User Script Commands][gmm] menu,
the script will try to load the image from a SVG file, prioritizing [Twemoji][twe].
Images are loaded using [`GM_addElement`][gae], which allows to circumvent a strict [Content Security Policy][csp] (CSP).

Visit [getemoji.com][gem] to test support for emojis on your browser.

Visit the Unicode official website at [unicode.org][ue1] or [unicode-org.github.io][ue2].

Read [Unicode Characters][uch] to get a better understanding of unicode characters and emojis.

## Installation

For more information, please refer to the [main page](../../README.md#installation).

```
https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/emojis/index.js
```

<!-- REFERENCE LINKS -->
[gem]: https://getemoji.com
[ue1]: https://unicode.org/emoji/techindex.html
[ue2]: https://unicode-org.github.io/emoji/emoji
[uch]: https://gist.github.com/flipeador/4ea725293c49a270bcc6e96ef2b8d281 "Unicode Characters (Gist)"
[csp]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
[uts51]: https://www.unicode.org/reports/tr51

[twe]: https://cdnjs.com/libraries/twemoji
[nce]: https://fonts.google.com/noto/specimen/Noto+Color+Emoji

[gae]: https://violentmonkey.github.io/api/gm/#gm_addelement
[gmm]: https://wiki.greasespot.net/Greasemonkey_Manual:Monkey_Menu
