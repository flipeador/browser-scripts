'use strict';
// ==UserScript==
// @name        YouTube Player Embed
// @author      Flipeador
// @version     1.0.0
// @namespace   https://github.com/flipeador/browser-scripts
// @homepageURL https://github.com/flipeador/browser-scripts/tree/main/scripts/youtube-embed
// @match       https://www.youtube.com/watch?v=*
// @grant       GM_addElement
// @grant       GM_registerMenuCommand
// @run-at      document-idle
// @require     https://raw.githubusercontent.com/flipeador/browser-scripts/2643ded64b4213b6a0a34721e61122f9ada25490/scripts/greasemonkey.js
// @require     https://raw.githubusercontent.com/flipeador/browser-scripts/4377fe54446f6a16a1ba95b71d44cecb818db38e/scripts/utils.js
// @downloadURL https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/youtube-embed/index.js
// ==/UserScript==

// greasemonkey.js
/* global regToggleMenuCmd */

// utils.js
/* global querySelector */

const videoUrl = location.href;
const embedUrl = videoUrl.replace('watch?v=', 'embed/');

(async () => {
    let parent, player, iframe;

    regToggleMenuCmd(
        'Toggle Player Embed',
        async ({ enabled }) => {
            if (!player) {
                player = await querySelector('#player:not(.skeleton)');
                parent = player.parentElement;
            }

            if (!iframe) {
                iframe = GM_addElement(parent, 'iframe', { src: embedUrl });
                iframe.style.width = '100%'; iframe.style.height = '80vh';
                player.insertAdjacentElement('afterend', iframe);
            }

            iframe.style.display = enabled ? '' : 'none';
            player.style.display = enabled ? 'none' : '';
        }
    );
})();
