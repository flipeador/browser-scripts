# Full Emoji Support For All Websites

Emoji are pictographs (pictorial symbols) that are typically presented in a colorful form and used inline in text.
They represent things such as faces, weather, vehicles and buildings, food and drink, animals and plants, or icons that represent emotions, feelings, or activities.

This script allows you to render all emoji symbols and sequences in the browser, as specified in [Unicode® Technical Standard #51][uts51].

- Unicode Emoji Version: `15.1.0`.
- Included fonts: [Twemoji][tcf], [Noto Color Emoji][nce].
- Some options are available from the [User Script Commands][gmm] menu.
  - Toggle the use of images to display emojis. Note that some sites may block the loading of images due to [security reasons][csp].
  - Toggle the force emoji-style mode (Variation Selector-15).
- There is a special handling for emojis on **YouTube**.

Visit [getemoji.com][gem] to test support for emojis on your browser.

Visit the Unicode official website at [unicode.org][ue1] or [unicode-org.github.io][ue2].

Read [Unicode Characters][uch] to get a better understanding of unicode characters and emojis.

## Installation

For more information, please refer to the [main page](../../README.md#installation).

```
https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/emojis/index.js
```

<!-- REFERENCE LINKS -->
[uts51]: https://www.unicode.org/reports/tr51
[ue1]: https://unicode.org/emoji/techindex.html
[ue2]: https://unicode-org.github.io/emoji/emoji
[tcf]: https://www.jsdelivr.com/package/npm/twemoji-colr-font
[nce]: https://fonts.google.com/noto/specimen/Noto+Color+Emoji
[csp]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP "Content Security Policy"
[gem]: https://getemoji.com
[gmm]: https://wiki.greasespot.net/Greasemonkey_Manual:Monkey_Menu
[uch]: https://gist.github.com/flipeador/4ea725293c49a270bcc6e96ef2b8d281 "Unicode Characters (Gist)"
