'use strict';
// ==UserScript==
// @name        Syntax Highlight
// @author      Flipeador
// @version     1.0.0
// @namespace   https://github.com/flipeador/browser-scripts
// @homepageURL https://github.com/flipeador/browser-scripts/tree/main/scripts/syntax-highlight
// @match       *://*/*
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_registerMenuCommand
// @require     https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.15.1/beautify.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.15.1/beautify-css.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.15.1/beautify-html.min.js
// @require     https://raw.githubusercontent.com/flipeador/browser-scripts/2643ded64b4213b6a0a34721e61122f9ada25490/scripts/greasemonkey.js
// @resource    CSS https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css
// @resource    GDD https://raw.githubusercontent.com/shikijs/textmate-grammars-themes/main/packages/tm-themes/themes/github-dark-default.json
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/syntax-highlight/index.js
// ==/UserScript==

// https://shiki.style

// https://beautifier.io
/* global js_beautify css_beautify html_beautify */

// https://highlightjs.org
/* global hljs */

// greasemonkey.js
/* global regToggleMenuCmd */

const BEAUTIFY_OPTIONS = {
    indent_size: 2,
    preserve_newlines: false,
    unescape_strings: true
};

const SHORT_LANGS = {
    'mjs': 'js',
    'kts': 'kt',
    'pm': 'pl',
    'm': 'mm',
    'make': 'mk',
    'yml': 'yaml',
    'markdown': 'md'
};

const LONG_LANGS = {
    'js': 'javascript',
    'ts': 'typescript',
    'sh': 'bash',
    'cs': 'csharp',
    'kt': 'kotlin',
    'pl': 'perl',
    'mm': 'objectivec',
    'mk': 'makefile',
    'md': 'markdown',
    'py': 'python',
    'rb': 'ruby',
    'rs': 'rust',
    'vb': 'vbnet',
    'phtml': 'php-template'
};

regToggleMenuCmd(
    'Syntax highlight',
    async ({ enabled }) =>
        enabled ? enableHighlight() : disableHighlight()
);

regToggleMenuCmd(
    'Word wrap',
    async ({ enabled }) => {
        for (const pre of document.querySelectorAll('pre')) {
            pre.style['overflow-wrap'] = enabled ? 'break-word' : 'normal';
            pre.style['white-space'] = enabled ? 'pre-wrap' : 'pre';
        }
    }
);

GM_registerMenuCommand(
    '⭐ Beautify js/json/css/html',
    async () => {
        const lang = getExtension()?.short;
        for (const element of getElements()) {
            if (element.hasAttribute('x-beautify'))
                continue;
            if (element.childElementCount !== 0) {
                if (element.hasAttribute('x-syntax-highlight'))
                    console.warn(
                        'Remove syntax highlight before beautify:',
                        element
                    );
                continue;
            }
            element.setAttribute('x-beautify', lang);
            const code = beautify(element.innerText, lang);
            if (code)
                element.replaceChildren(new Text(code));
        }
    },
    { autoClose: false }
);

function getExtension() {
    const url = new URL(location.href);
    const name = url.pathname.split('/').at(-1);
    if (!name.includes('.')) return;
    const ext = name.split('.').at(-1);
    const short = SHORT_LANGS[ext] || ext;
    const long = LONG_LANGS[short] || short;
    return { short, long };
}

function* getElements() {
    const pres = document.querySelectorAll('pre');
    for (const pre of pres) {
        if (pre.parentElement?.closest('pre')) continue;
        const code = pre.querySelector(':scope > code');
        yield code || pre;
    }
}

function beautify(code, lang) {
    if (lang === 'js' || lang === 'json')
        return js_beautify(code, BEAUTIFY_OPTIONS);
    if (lang === 'css')
        return css_beautify(code, BEAUTIFY_OPTIONS);
    if (lang === 'html')
        return html_beautify(code, BEAUTIFY_OPTIONS);
    return '';
}

async function enableHighlight() {
    const lang = getExtension();
    for (const element of getElements()) {
        if (element.childElementCount !== 0)
            continue;
        const code = element.innerText;
        if (code.length === 0) continue;
        element.setAttribute('x-syntax-highlight', '');
        if (!lang || code.length >= 50_000)
            await highlight(element, code, lang);
        else await shiki(element, code, lang);
    }
}

async function disableHighlight() {
    for (const element of getElements()) {
        if (!element.hasAttribute('x-syntax-highlight'))
            continue;
        element.removeAttribute('data-highlighted');
        element.replaceChildren(new Text(element.innerText));
    }
}

async function highlight(element, code, lang) {
    if (!highlight.css) {
        highlight.css = GM_getResourceText('CSS');
        GM_addStyle(highlight.css);
    }

    console.log(
        'Syntax Highlight (highlight):',
        { element, length: code.length, lang }
    );

    if (!lang)
        return hljs.highlightElement(element);

    element.innerHTML = hljs.highlight(code, {
        language: lang.long,
        ignoreIllegals: true
    }).value;
}

async function shiki(element, code, lang) {
    if (!shiki.gdd) {
        shiki.gdd = GM_getResourceText('GDD');
        shiki.gdd = JSON.parse(shiki.gdd);
        shiki.mod = await import('https://esm.sh/shiki@latest');
    }

    if (!shiki.mod.getHighlighter) // fallback
        return await highlight(element, code, lang);

    console.log(
        'Syntax Highlight (shiki):',
        { element, length: code.length, lang }
    );

    try {
        const highlighter = await shiki.mod.getHighlighter({
            langs: [lang.short]
        });
        await highlighter.loadTheme(shiki.gdd);

        element.innerHTML = await highlighter.codeToHtml(
            code,
            { lang: lang.short, theme: 'github-dark-default' }
        );
    } catch (error) { // fallback
        console.error(error);
        await highlight(element, code, lang);
    }
}
