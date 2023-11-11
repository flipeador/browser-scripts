# Full Emoji Support For All Websites

Emoji are pictographs (pictorial symbols) that are typically presented in a colorful form and used inline in text.
They represent things such as faces, weather, vehicles and buildings, food and drink, animals and plants, or icons that represent emotions, feelings, or activities.

This script allows you to render all emoji symbols and sequences in the browser, as specified in [Unicode® Technical Standard #51][uts51].

- Unicode Emoji Version: `v15`.
- Included fonts: [Twemoji][twfnt], [Noto Color Emoji][nefnt].
- Some options are available from the [User Script Commands][mm] menu.
  - Toggle the use of images to display emojis. Note that some sites may block the loading of images due to [security reasons][csp].
  - Toggle the enforce emoji-style mode (Variation Selector-15).
- There is a special handling for emojis on **YouTube**, but it requires the [`:has`][csshas] CSS selector.

Visit [getemoji.com][ge] to test support for emojis on your browser.

You can also check the Unicode official website at [unicode.org][uni1] or [unicode-org.github.io][uni2].

Consider reading [Unicode Characters][uc] to get a better understanding of unicode characters and emojis.

## Installation

For more information, please refer to the [main page](../../README.md#installation).

```
https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/emojis/index.js
```

<!-- REFERENCE LINKS -->
[uts51]: https://www.unicode.org/reports/tr51
[uni1]: https://unicode.org/emoji/techindex.html
[uni2]: https://unicode-org.github.io/emoji/emoji
[twfnt]: https://www.jsdelivr.com/package/npm/twemoji-colr-font
[nefnt]: https://fonts.google.com/noto/specimen/Noto+Color+Emoji
[csshas]: https://caniuse.com/css-has
[csp]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP "Content Security Policy"
[ge]: https://getemoji.com
[mm]: https://wiki.greasespot.net/Greasemonkey_Manual:Monkey_Menu
[uc]: https://gist.github.com/flipeador/4ea725293c49a270bcc6e96ef2b8d281 "Unicode Characters (Gist)"
