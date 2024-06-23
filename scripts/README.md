# Scripts

Files in this directory can be safely imported in private user scripts by relying on [permanent links][pl].

1. Open a file such as [`utils.js`](./utils.js) in the browser.
2. Click `...` (More file actions) and select `Copy permalink`.

```
https://github.com/flipeador/browser-scripts/blob/761129b5da8f27b7bcf96d69b45c42207e4cfa0a/scripts/utils.js
```

3. Import the file using `@require` as follows:

```js
// ==UserScript==
// @require https://raw.githubusercontent.com/flipeador/browser-scripts/761129b5da8f27b7bcf96d69b45c42207e4cfa0a/scripts/utils.js
// ==/UserScript==
```

## Documentation

### Tampermonkey

<https://www.tampermonkey.net/documentation.php>

### Violentmonkey

<https://violentmonkey.github.io/api/gm>

<!-- REFERENCE LINKS -->
[pl]: https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files
