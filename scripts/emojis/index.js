'use strict';

// utils.js
/* global search, isIntersecting, getClosestElement, mutationObserver */

// ==UserScript==
// @name        Full Emoji Support For All Websites
// @author      Flipeador
// @version     1.0.0
// @namespace   https://github.com/flipeador/browser-scripts
// @homepageURL https://github.com/flipeador/browser-scripts/tree/main/scripts/emojis
// @include     *
// @exclude     *twitter.com*
// @exclude     *discord.com*
// @exclude     *twitch.tv*
// @exclude     *notion.so*
// @exclude     *localhost*
// @grant       GM_addStyle
// @run-at      document-idle
// @require     https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/utils.js
// @downloadURL https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/emojis/index.js
// ==/UserScript==

// Determines whether to try to display emojis using images.
const USE_IMG_EMOJI = false;

const supportsHas = CSS.supports('selector(:has(._))');

const U200D = String.fromCharCode(0x200D); // Zero Width Joiner
const reUFE0F = /\uFE0F/gu; // Variant Selector-16

// https://github.com/mathiasbynens/emoji-test-regex-pattern
const re = /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299\u{1F004}\u{1F170}\u{1F171}\u{1F17E}\u{1F17F}\u{1F202}\u{1F237}\u{1F321}\u{1F324}-\u{1F32C}\u{1F336}\u{1F37D}\u{1F396}\u{1F397}\u{1F399}-\u{1F39B}\u{1F39E}\u{1F39F}\u{1F3CD}\u{1F3CE}\u{1F3D4}-\u{1F3DF}\u{1F3F5}\u{1F3F7}\u{1F43F}\u{1F4FD}\u{1F549}\u{1F54A}\u{1F56F}\u{1F570}\u{1F573}\u{1F576}-\u{1F579}\u{1F587}\u{1F58A}-\u{1F58D}\u{1F5A5}\u{1F5A8}\u{1F5B1}\u{1F5B2}\u{1F5BC}\u{1F5C2}-\u{1F5C4}\u{1F5D1}-\u{1F5D3}\u{1F5DC}-\u{1F5DE}\u{1F5E1}\u{1F5E3}\u{1F5E8}\u{1F5EF}\u{1F5F3}\u{1F5FA}\u{1F6CB}\u{1F6CD}-\u{1F6CF}\u{1F6E0}-\u{1F6E5}\u{1F6E9}\u{1F6F0}\u{1F6F3}]\uFE0F?|[\u261D\u270C\u270D\u{1F574}\u{1F590}][\uFE0F\u{1F3FB}-\u{1F3FF}]?|[\u26F9\u{1F3CB}\u{1F3CC}\u{1F575}][\uFE0F\u{1F3FB}-\u{1F3FF}]?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\u270A\u270B\u{1F385}\u{1F3C2}\u{1F3C7}\u{1F442}\u{1F443}\u{1F446}-\u{1F450}\u{1F466}\u{1F467}\u{1F46B}-\u{1F46D}\u{1F472}\u{1F474}-\u{1F476}\u{1F478}\u{1F47C}\u{1F483}\u{1F485}\u{1F48F}\u{1F491}\u{1F4AA}\u{1F57A}\u{1F595}\u{1F596}\u{1F64C}\u{1F64F}\u{1F6C0}\u{1F6CC}\u{1F90C}\u{1F90F}\u{1F918}-\u{1F91F}\u{1F930}-\u{1F934}\u{1F936}\u{1F977}\u{1F9B5}\u{1F9B6}\u{1F9BB}\u{1F9D2}\u{1F9D3}\u{1F9D5}\u{1FAC3}-\u{1FAC5}\u{1FAF0}\u{1FAF2}-\u{1FAF8}][\u{1F3FB}-\u{1F3FF}]?|[\u{1F3C3}\u{1F6B6}\u{1F9CE}][\u{1F3FB}-\u{1F3FF}]?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|[\u{1F3C4}\u{1F3CA}\u{1F46E}\u{1F470}\u{1F471}\u{1F473}\u{1F477}\u{1F481}\u{1F482}\u{1F486}\u{1F487}\u{1F645}-\u{1F647}\u{1F64B}\u{1F64D}\u{1F64E}\u{1F6A3}\u{1F6B4}\u{1F6B5}\u{1F926}\u{1F935}\u{1F937}-\u{1F939}\u{1F93D}\u{1F93E}\u{1F9B8}\u{1F9B9}\u{1F9CD}\u{1F9CF}\u{1F9D4}\u{1F9D6}-\u{1F9DD}][\u{1F3FB}-\u{1F3FF}]?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\u{1F46F}\u{1F9DE}\u{1F9DF}](?:\u200D[\u2640\u2642]\uFE0F?)?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50\u{1F0CF}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F201}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F236}\u{1F238}-\u{1F23A}\u{1F250}\u{1F251}\u{1F300}-\u{1F320}\u{1F32D}-\u{1F335}\u{1F337}-\u{1F343}\u{1F345}-\u{1F34A}\u{1F34C}-\u{1F37C}\u{1F37E}-\u{1F384}\u{1F386}-\u{1F393}\u{1F3A0}-\u{1F3C1}\u{1F3C5}\u{1F3C6}\u{1F3C8}\u{1F3C9}\u{1F3CF}-\u{1F3D3}\u{1F3E0}-\u{1F3F0}\u{1F3F8}-\u{1F407}\u{1F409}-\u{1F414}\u{1F416}-\u{1F425}\u{1F427}-\u{1F43A}\u{1F43C}-\u{1F43E}\u{1F440}\u{1F444}\u{1F445}\u{1F451}-\u{1F465}\u{1F46A}\u{1F479}-\u{1F47B}\u{1F47D}-\u{1F480}\u{1F484}\u{1F488}-\u{1F48E}\u{1F490}\u{1F492}-\u{1F4A9}\u{1F4AB}-\u{1F4FC}\u{1F4FF}-\u{1F53D}\u{1F54B}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F5A4}\u{1F5FB}-\u{1F62D}\u{1F62F}-\u{1F634}\u{1F637}-\u{1F641}\u{1F643}\u{1F644}\u{1F648}-\u{1F64A}\u{1F680}-\u{1F6A2}\u{1F6A4}-\u{1F6B3}\u{1F6B7}-\u{1F6BF}\u{1F6C1}-\u{1F6C5}\u{1F6D0}-\u{1F6D2}\u{1F6D5}-\u{1F6D7}\u{1F6DC}-\u{1F6DF}\u{1F6EB}\u{1F6EC}\u{1F6F4}-\u{1F6FC}\u{1F7E0}-\u{1F7EB}\u{1F7F0}\u{1F90D}\u{1F90E}\u{1F910}-\u{1F917}\u{1F920}-\u{1F925}\u{1F927}-\u{1F92F}\u{1F93A}\u{1F93F}-\u{1F945}\u{1F947}-\u{1F976}\u{1F978}-\u{1F9B4}\u{1F9B7}\u{1F9BA}\u{1F9BC}-\u{1F9CC}\u{1F9D0}\u{1F9E0}-\u{1F9FF}\u{1FA70}-\u{1FA7C}\u{1FA80}-\u{1FA88}\u{1FA90}-\u{1FABD}\u{1FABF}-\u{1FAC2}\u{1FACE}-\u{1FADB}\u{1FAE0}-\u{1FAE8}]|\u26D3\uFE0F?(?:\u200D\u{1F4A5})?|\u2764\uFE0F?(?:\u200D[\u{1F525}\u{1FA79}])?|\u{1F1E6}[\u{1F1E8}-\u{1F1EC}\u{1F1EE}\u{1F1F1}\u{1F1F2}\u{1F1F4}\u{1F1F6}-\u{1F1FA}\u{1F1FC}\u{1F1FD}\u{1F1FF}]|\u{1F1E7}[\u{1F1E6}\u{1F1E7}\u{1F1E9}-\u{1F1EF}\u{1F1F1}-\u{1F1F4}\u{1F1F6}-\u{1F1F9}\u{1F1FB}\u{1F1FC}\u{1F1FE}\u{1F1FF}]|\u{1F1E8}[\u{1F1E6}\u{1F1E8}\u{1F1E9}\u{1F1EB}-\u{1F1EE}\u{1F1F0}-\u{1F1F5}\u{1F1F7}\u{1F1FA}-\u{1F1FF}]|\u{1F1E9}[\u{1F1EA}\u{1F1EC}\u{1F1EF}\u{1F1F0}\u{1F1F2}\u{1F1F4}\u{1F1FF}]|\u{1F1EA}[\u{1F1E6}\u{1F1E8}\u{1F1EA}\u{1F1EC}\u{1F1ED}\u{1F1F7}-\u{1F1FA}]|\u{1F1EB}[\u{1F1EE}-\u{1F1F0}\u{1F1F2}\u{1F1F4}\u{1F1F7}]|\u{1F1EC}[\u{1F1E6}\u{1F1E7}\u{1F1E9}-\u{1F1EE}\u{1F1F1}-\u{1F1F3}\u{1F1F5}-\u{1F1FA}\u{1F1FC}\u{1F1FE}]|\u{1F1ED}[\u{1F1F0}\u{1F1F2}\u{1F1F3}\u{1F1F7}\u{1F1F9}\u{1F1FA}]|\u{1F1EE}[\u{1F1E8}-\u{1F1EA}\u{1F1F1}-\u{1F1F4}\u{1F1F6}-\u{1F1F9}]|\u{1F1EF}[\u{1F1EA}\u{1F1F2}\u{1F1F4}\u{1F1F5}]|\u{1F1F0}[\u{1F1EA}\u{1F1EC}-\u{1F1EE}\u{1F1F2}\u{1F1F3}\u{1F1F5}\u{1F1F7}\u{1F1FC}\u{1F1FE}\u{1F1FF}]|\u{1F1F1}[\u{1F1E6}-\u{1F1E8}\u{1F1EE}\u{1F1F0}\u{1F1F7}-\u{1F1FB}\u{1F1FE}]|\u{1F1F2}[\u{1F1E6}\u{1F1E8}-\u{1F1ED}\u{1F1F0}-\u{1F1FF}]|\u{1F1F3}[\u{1F1E6}\u{1F1E8}\u{1F1EA}-\u{1F1EC}\u{1F1EE}\u{1F1F1}\u{1F1F4}\u{1F1F5}\u{1F1F7}\u{1F1FA}\u{1F1FF}]|\u{1F1F4}\u{1F1F2}|\u{1F1F5}[\u{1F1E6}\u{1F1EA}-\u{1F1ED}\u{1F1F0}-\u{1F1F3}\u{1F1F7}-\u{1F1F9}\u{1F1FC}\u{1F1FE}]|\u{1F1F6}\u{1F1E6}|\u{1F1F7}[\u{1F1EA}\u{1F1F4}\u{1F1F8}\u{1F1FA}\u{1F1FC}]|\u{1F1F8}[\u{1F1E6}-\u{1F1EA}\u{1F1EC}-\u{1F1F4}\u{1F1F7}-\u{1F1F9}\u{1F1FB}\u{1F1FD}-\u{1F1FF}]|\u{1F1F9}[\u{1F1E6}\u{1F1E8}\u{1F1E9}\u{1F1EB}-\u{1F1ED}\u{1F1EF}-\u{1F1F4}\u{1F1F7}\u{1F1F9}\u{1F1FB}\u{1F1FC}\u{1F1FF}]|\u{1F1FA}[\u{1F1E6}\u{1F1EC}\u{1F1F2}\u{1F1F3}\u{1F1F8}\u{1F1FE}\u{1F1FF}]|\u{1F1FB}[\u{1F1E6}\u{1F1E8}\u{1F1EA}\u{1F1EC}\u{1F1EE}\u{1F1F3}\u{1F1FA}]|\u{1F1FC}[\u{1F1EB}\u{1F1F8}]|\u{1F1FD}\u{1F1F0}|\u{1F1FE}[\u{1F1EA}\u{1F1F9}]|\u{1F1FF}[\u{1F1E6}\u{1F1F2}\u{1F1FC}]|\u{1F344}(?:\u200D\u{1F7EB})?|\u{1F34B}(?:\u200D\u{1F7E9})?|\u{1F3F3}\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\u{1F308}))?|\u{1F3F4}(?:\u200D\u2620\uFE0F?|\u{E0067}\u{E0062}(?:\u{E0065}\u{E006E}\u{E0067}|\u{E0073}\u{E0063}\u{E0074}|\u{E0077}\u{E006C}\u{E0073})\u{E007F})?|\u{1F408}(?:\u200D\u2B1B)?|\u{1F415}(?:\u200D\u{1F9BA})?|\u{1F426}(?:\u200D[\u2B1B\u{1F525}])?|\u{1F43B}(?:\u200D\u2744\uFE0F?)?|\u{1F441}\uFE0F?(?:\u200D\u{1F5E8}\uFE0F?)?|\u{1F468}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F468}\u{1F469}]\u200D(?:\u{1F466}(?:\u200D\u{1F466})?|\u{1F467}(?:\u200D[\u{1F466}\u{1F467}])?)|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F468}|\u{1F466}(?:\u200D\u{1F466})?|\u{1F467}(?:\u200D[\u{1F466}\u{1F467}])?)|\u{1F3FB}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F468}[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D\u{1F468}[\u{1F3FC}-\u{1F3FF}]))?|\u{1F3FC}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F468}[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D\u{1F468}[\u{1F3FB}\u{1F3FD}-\u{1F3FF}]))?|\u{1F3FD}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F468}[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D\u{1F468}[\u{1F3FB}\u{1F3FC}\u{1F3FE}\u{1F3FF}]))?|\u{1F3FE}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F468}[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D\u{1F468}[\u{1F3FB}-\u{1F3FD}\u{1F3FF}]))?|\u{1F3FF}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F468}[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D\u{1F468}[\u{1F3FB}-\u{1F3FE}]))?)?|\u{1F469}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?[\u{1F468}\u{1F469}]|\u{1F466}(?:\u200D\u{1F466})?|\u{1F467}(?:\u200D[\u{1F466}\u{1F467}])?|\u{1F469}\u200D(?:\u{1F466}(?:\u200D\u{1F466})?|\u{1F467}(?:\u200D[\u{1F466}\u{1F467}])?))|\u{1F3FB}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:[\u{1F468}\u{1F469}]|\u{1F48B}\u200D[\u{1F468}\u{1F469}])[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D[\u{1F468}\u{1F469}][\u{1F3FC}-\u{1F3FF}]))?|\u{1F3FC}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:[\u{1F468}\u{1F469}]|\u{1F48B}\u200D[\u{1F468}\u{1F469}])[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D[\u{1F468}\u{1F469}][\u{1F3FB}\u{1F3FD}-\u{1F3FF}]))?|\u{1F3FD}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:[\u{1F468}\u{1F469}]|\u{1F48B}\u200D[\u{1F468}\u{1F469}])[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D[\u{1F468}\u{1F469}][\u{1F3FB}\u{1F3FC}\u{1F3FE}\u{1F3FF}]))?|\u{1F3FE}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:[\u{1F468}\u{1F469}]|\u{1F48B}\u200D[\u{1F468}\u{1F469}])[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D[\u{1F468}\u{1F469}][\u{1F3FB}-\u{1F3FD}\u{1F3FF}]))?|\u{1F3FF}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:[\u{1F468}\u{1F469}]|\u{1F48B}\u200D[\u{1F468}\u{1F469}])[\u{1F3FB}-\u{1F3FF}]|\u{1F91D}\u200D[\u{1F468}\u{1F469}][\u{1F3FB}-\u{1F3FE}]))?)?|\u{1F62E}(?:\u200D\u{1F4A8})?|\u{1F635}(?:\u200D\u{1F4AB})?|\u{1F636}(?:\u200D\u{1F32B}\uFE0F?)?|\u{1F642}(?:\u200D[\u2194\u2195]\uFE0F?)?|\u{1F93C}(?:[\u{1F3FB}-\u{1F3FF}]|\u200D[\u2640\u2642]\uFE0F?)?|\u{1F9D1}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F384}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u{1F91D}\u200D\u{1F9D1}|\u{1F9D1}\u200D\u{1F9D2}(?:\u200D\u{1F9D2})?|\u{1F9D2}(?:\u200D\u{1F9D2})?)|\u{1F3FB}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F384}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F9D1}[\u{1F3FC}-\u{1F3FF}]|\u{1F91D}\u200D\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]))?|\u{1F3FC}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F384}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F9D1}[\u{1F3FB}\u{1F3FD}-\u{1F3FF}]|\u{1F91D}\u200D\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]))?|\u{1F3FD}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F384}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F9D1}[\u{1F3FB}\u{1F3FC}\u{1F3FE}\u{1F3FF}]|\u{1F91D}\u200D\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]))?|\u{1F3FE}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F384}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F9D1}[\u{1F3FB}-\u{1F3FD}\u{1F3FF}]|\u{1F91D}\u200D\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]))?|\u{1F3FF}(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|[\u{1F9AF}\u{1F9BC}\u{1F9BD}](?:\u200D\u27A1\uFE0F?)?|[\u{1F33E}\u{1F373}\u{1F37C}\u{1F384}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u2764\uFE0F?\u200D(?:\u{1F48B}\u200D)?\u{1F9D1}[\u{1F3FB}-\u{1F3FE}]|\u{1F91D}\u200D\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]))?)?|\u{1FAF1}(?:\u{1F3FB}(?:\u200D\u{1FAF2}[\u{1F3FC}-\u{1F3FF}])?|\u{1F3FC}(?:\u200D\u{1FAF2}[\u{1F3FB}\u{1F3FD}-\u{1F3FF}])?|\u{1F3FD}(?:\u200D\u{1FAF2}[\u{1F3FB}\u{1F3FC}\u{1F3FE}\u{1F3FF}])?|\u{1F3FE}(?:\u200D\u{1FAF2}[\u{1F3FB}-\u{1F3FD}\u{1F3FF}])?|\u{1F3FF}(?:\u200D\u{1FAF2}[\u{1F3FB}-\u{1F3FE}])?)?/gu;

const observers = [];

function observe(node, callback) {
    const target = getClosestElement(node);
    if (!target || target.classList.contains('x-emoji')) return;
    const observer = new IntersectionObserver(
        (entries, observer) => {
            if (isIntersecting(entries)) {
                observer.disconnect();
                const index = observers.indexOf(observer);
                if (index !== -1) observers.splice(index, 1);
                callback(node, observer);
            }
        }
    );
    observer.observe(target);
    observers.push(observer);
    return observer;
}

function getEmojiCodePoint(str) {
    return [...(
        str.indexOf(U200D) === -1
        ? str.replace(reUFE0F, '')
        : str
    )]
    .map(cp => cp.codePointAt(0).toString(16))
    .join('-');
}

function createSpan(node, cls='') {
    const span = document.createElement('span');
    span.className = `x-emoji ${cls}`;
    span.appendChild(node);
    return span;
}

function createImage(src, attr) {
    const img = new Image();
    return new Promise((resolve, reject) => {
        let index = 0;
        img.onerror = event => {
            if (++index >= src.length)
                return reject(event.target);
            event.target.src = src[index];
        };
        img.onload = ev => resolve(ev.target);
        if (attr) Object.assign(img, attr);
        setTimeout(() => img.src = src[index]);
    });
}

function createEmojiImage(emoji, callback) {
    const cp = getEmojiCodePoint(emoji);
    const cp_ = cp.replaceAll('-', '_');

    createImage(
        [
            // Twitter Emoji (Twemoji)
            // https://github.com/twitter/twemoji
            // https://github.com/jdecked/twemoji
            // https://cdnjs.com/libraries/twemoji
            `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${cp}.svg`,
            `https://cdn.jsdelivr.net/gh/jdecked/twemoji@14.1.2/assets/svg/${cp}.svg`,
            // Google Noto Emoji
            // https://github.com/googlefonts/noto-emoji
            `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${cp_}.svg`
            // Microsoft Fluent Emoji
            // https://github.com/bignutty/fluent-emoji
            // `https://raw.githubusercontent.com/bignutty/fluent-emoji/main/animated/${cp}.png`,
            // `https://raw.githubusercontent.com/bignutty/fluent-emoji/main/vector/${cp}.svg`
        ],
        { className: 'x-emoji x-emoji-img', alt: emoji, draggable: false }
    ).then(
        img => callback(img),
        () => console.warn(`Failed to load emoji "${emoji}" (${cp})`)
    );
}

function createEmoji(emoji) {
    const node = new Text(emoji);
    if (USE_IMG_EMOJI)
        createEmojiImage(emoji, img => node.replaceWith(img));
    return createSpan(node, 'x-emoji-wrapper');
}

function parseTextNodes(parent, list=[]) {
    for (const node of parent.childNodes) {
        if (node.nodeType === Node.TEXT_NODE)
            list.push?.(node) ?? list(node);
        else if (
            node.nodeType === Node.ELEMENT_NODE &&
            !node.classList?.contains('x-emoji') &&
            !node.classList?.contains('emoji-list') && // emoji picker?
            !node.classList?.contains('aria-hidden') &&
            !node.hasAttribute?.('aria-hidden') &&
            !node.hasAttribute?.('contenteditable') &&
            !('ownerSVGElement' in node) &&
            !(/^(?:iframe|noframes|noscript|script|select|style|textarea)$/u)
                .test(node.nodeName.toLowerCase())
        ) parseTextNodes(node, list);
    }
    return list;
}

function parseTextNode(node) {
    const fragment = new DocumentFragment();
    if (search(re, node.nodeValue,
        emoji => fragment.appendChild(createEmoji(emoji)),
        text => fragment.appendChild(new Text(text))
    )) node.replaceWith(createSpan(fragment));
}

// function parseImageNode(img)
// {
//     img.classList.add('x-emoji');
//     createEmojiImage(img.alt, emoji => {
//         img.replaceWith(createSpan(emoji, 'x-emoji x-emoji-wrapper'));
//     });
// }

mutationObserver(root => {
    while (observers.length)
        observers.pop().disconnect();

    // YouTube
    if (supportsHas) // firefox... 💩
    for (const content of root.querySelectorAll(
        ':not(.x-yt-emoji):has(>img.emoji[src*="/emoji/"])'
    )) {
        content.classList.add('x-yt-emoji');
        let text = '';
        const fragment = new DocumentFragment();
        for (const node of [...content.childNodes]) {
            if (
                node instanceof HTMLSpanElement ||
                node instanceof HTMLImageElement &&
                node.src.indexOf('/emoji/') !== -1
            ) text += node.alt ?? node.innerText;
            else {
                if (text) fragment.appendChild(new Text(text));
                fragment.appendChild(node); // [!] cut-and-paste
                text = '';
            }
        }
        if (text) fragment.appendChild(new Text(text));
        content.replaceChildren();
        content.appendChild(fragment);
    }

    parseTextNodes(root, node => observe(node, parseTextNode));
});

// https://violentmonkey.github.io/api/gm/#gm_addstyle
// https://www.jsdelivr.com/package/npm/twemoji-colr-font
// https://fonts.google.com/noto/specimen/Noto+Color+Emoji
// eslint-disable-next-line no-undef
GM_addStyle(`
  @import url('https://cdn.jsdelivr.net/npm/twemoji-colr-font/twemoji.min.css');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap');

  .x-emoji-wrapper {
    font-family: Twemoji, "Noto Color Emoji", sans-serif !important;
    cursor: text !important;
  }

  :is(a, button, [role="button"]) .x-emoji-wrapper {
    cursor: unset !important;
  }

  .x-emoji-img {
    display: inline !important;
    width: 1em !important;
    height: 1em !important;
    margin: 0 .2em 0 .2em !important;
    vertical-align: -0.1em !important;
    background-color: transparent !important;
    pointer-events: none !important;
    scale: 1.1 !important;
  }
`);
