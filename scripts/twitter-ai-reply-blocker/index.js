/* eslint-disable strict, no-alert */
'use strict';

/* global GM_getValue, GM_setValue, GM_registerMenuCommand */

// utils.js
/* global mutationObserver */

// twitter.js
/* global Twitter */

// ==UserScript==
// @name        Twitter AI Reply Blocker
// @author      Flipeador
// @version     1.0.4
// @namespace   https://github.com/flipeador/browser-scripts
// @homepageURL https://github.com/flipeador/browser-scripts/tree/main/scripts/twitter-ai-reply-blocker
// @match       https://twitter.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @run-at      document-idle
// @noframes
// @require     https://raw.githubusercontent.com/flipeador/browser-scripts/1c2ce7968b79ec8adc1680ca1918c9d686d4d3ad/scripts/utils.js
// @require     https://raw.githubusercontent.com/flipeador/browser-scripts/c556acdb91be801162223f60352d08ec968256a9/scripts/twitter.js
// @downloadURL https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/twitter-ai-reply-blocker/index.js
// ==/UserScript==

// Blacklisted accounts.
const BLACKLIST = ['ReplyGPT_Lol', 'ReplyGPT', 'RoflGPTBot', 'LmaoGPT', 'BurnGPT', 'TruthGPTBot', 'EntertainUsNob', 'ExplainThisGod', 'RoastHimJim', 'RoastMasterYoda', 'MakeItAQuote', 'DrawThisTweet', 'McPepes_AI', 'GrugThis', 'ExplainthisRick', 'FrameHimJim', 'ExplainThisBean', 'ExplainThisLiu', 'ExplainThisTumb', 'BasedReplyBot', 'LameGPT', 'MrShelbySays', 'MarinethisBob', 'ReplyGrump', 'BoomerExplains', 'PleaseDebunk'];
// Accounts with at least this amount of followers will never be blocked.
const MIN_FOLLOWERS_COUNT = 5000;

const ignoreList = [];

function escapeRegEx(str) {
    // https://stackoverflow.com/a/3561711/14822191
    return str.replace(/[/\-\\^$*+?.()|[\]{}]/gu, '\\$&');
}

function addUserToBlacklist(user) {
    user = escapeRegEx(user.replace(/\s+|@/gu, ''));
    if (!user || BLACKLIST.includes(user)) return;
    const list = GM_getValue('blacklist') ?? [];
    if (!list.includes(user))
      GM_setValue('blacklist', [...list, user]);
}

function removeUserFromBlacklist(user) {
    const list = GM_getValue('blacklist') ?? [];
    const index = list.indexOf(user);
    if (index === -1) return;
    list.splice(index, 1);
    GM_setValue('blacklist', list);
}

GM_registerMenuCommand(
    'Add user to blacklist',
    () => addUserToBlacklist(prompt('Username:'))
);

GM_registerMenuCommand(
    'Remove user from blacklist',
    () => removeUserFromBlacklist(prompt('Username:'))
);

GM_registerMenuCommand(
    'Show blacklist',
    () => alert(`${BLACKLIST.join('|')}\n\n${(GM_getValue('blacklist')??[]).join('|')}`)
);

function checkTweetText(text) {
    if (!text) return;

    const blacklist = [
        ...BLACKLIST,
        ...GM_getValue('blacklist') ?? []
    ].join('|');

    const re = new RegExp(`\\s+|@(${blacklist})`, 'gui');
    return text.replace(re, '') === '';
}

mutationObserver(async () => {
    const tweets = [...Twitter.parseAllTweets()];

    const list = tweets.filter(data => {
        if (checkTweetText(data.text)) {
            data.box.style.display = 'none'; // hide tweet
            if (!ignoreList.includes(data.user.name))
                return ignoreList.push(data.user.name);
        }
        return false;
    });
    if (!list.length) return;

    const info = await Twitter.lookupUsers(
        list.map(data => data.user.name)
    );
    if (!info) return;

    list.forEach(async (data, index) => {
        if (
            info[index] &&
            !info[index].following && // do not block accounts you follow
            info[index].followers_count < MIN_FOLLOWERS_COUNT
        ) {
            const result = await Twitter.blockUser(data.user.name);
            console.log(
                '%cBlock:',
                `color: ${result ? 'green' : 'red'};`,
                data.user.url, data.box, data.tweet, data.text
            );
        }
    });
});
