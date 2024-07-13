# Full Emoji Support For All Websites

Emoji are pictographs (pictorial symbols) that are typically presented in a colorful form and used inline in text.
They represent things such as faces, weather, vehicles and buildings, food and drink, animals and plants,
or icons that represent emotions, feelings, or activities.

Render all emoji symbols and sequences in the browser, as specified in the [Unicode®︎ Technical Standard #51][uts51].

By default, the script uses the [Noto Emoji][nef] and [Noto Color Emoji][ncef] fonts to display emojis,
you might want to install them locally on your system just in case.
For polychrome emojis, you can enable the use of images to display emojis from the [User Script Commands][gmm] menu,
the script will try to load the image from a SVG file, prioritizing [Twemoji][twe].
Images are loaded using [`GM_addElement`][gae], which allows to circumvent a strict [Content Security Policy][csp] (CSP).

Visit [getemoji.com][gem] to test support for emojis on your browser.

Visit the Unicode official website at [unicode.org][ue1] or [unicode-org.github.io][ue2].

Read [Unicode Characters][uch] to get a better understanding of unicode characters and emojis.

## Features

- [x] Support image emojis: [Twemoji][twe], [Noto Emoji][ne].
- [x] Support animated emojis: [MS Fluent Emoji][fe].
- [x] Support [monochrome][nef] and [polychrome][ncef] emojis.
- [x] Special handling for emojis on YouTube and Twitter.
- [x] Fix weird [shrinking font size of hyperlinks][xfsl] on Twitter.
- [x] Show emoji name and code point [on mouse over][title].
- [x] Characters `©︎` and `®︎` are not treated as emojis.
- [x] Support Unicode Emoji [`v16.0β`][160] (2024).

## Installation

For more information, please refer to the [main page](../../README.md#installation).

```
https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/emojis/index.js
```

<!-- REFERENCE LINKS -->
[gem]: https://getemoji.com

[160]: https://www.unicode.org/emoji/charts-16.0
[ue1]: https://unicode.org/emoji/techindex.html
[ue2]: https://unicode-org.github.io/emoji/emoji
[uts51]: https://www.unicode.org/reports/tr51

[uch]: https://gist.github.com/flipeador/4ea725293c49a270bcc6e96ef2b8d281 "Unicode Characters (Gist)"

[csp]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
[title]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title "HTML title attribute"

[twe]: https://github.com/jdecked/twemoji
[fe]: https://github.com/bignutty/fluent-emoji
[ne]: https://github.com/googlefonts/noto-emoji
[nef]: https://fonts.google.com/noto/specimen/Noto+Emoji "Noto Emoji (font)"
[ncef]: https://fonts.google.com/noto/specimen/Noto+Color+Emoji "Noto Color Emoji (font)"

[gae]: https://violentmonkey.github.io/api/gm/#gm_addelement
[gmm]: https://wiki.greasespot.net/Greasemonkey_Manual:Monkey_Menu

[xfsl]: https://www.reddit.com/r/Twitter/comments/1beghib/hyperlink_font_size_shrinks_on_chrome
