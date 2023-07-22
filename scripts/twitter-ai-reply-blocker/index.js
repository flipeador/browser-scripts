'use strict';

// utils.js
/* global mutationObserver */

// twitter.js
/* global Twitter */

// ==UserScript==
// @name        Twitter IA Reply Blocker
// @author      Flipeador
// @version     1.0.0
// @namespace   https://github.com/flipeador/browser-scripts
// @homepageURL https://github.com/flipeador/browser-scripts/tree/main/scripts/twitter-ai-reply-blocker
// @match       https://twitter.com/*
// @run-at      document-idle
// @noframes
// @require     https://raw.githubusercontent.com/flipeador/browser-scripts/c556acdb91be801162223f60352d08ec968256a9/scripts/utils.js
// @require     https://raw.githubusercontent.com/flipeador/browser-scripts/c556acdb91be801162223f60352d08ec968256a9/scripts/twitter.js
// @downloadURL https://raw.githubusercontent.com/flipeador/browser-scripts/main/scripts/twitter-ai-reply-blocker/index.js
// ==/UserScript==

// Blacklisted accounts.
const BLACKLIST = /\s+|@(ReplyGPT|RoflGPTBot|LmaoGPT|BurnGPT|TruthGPTBot|EntertainUsNob|ExplainThisGod|RoastHimJim|RoastMasterYoda|MakeItAQuote|DrawThisTweet|McPepes_AI|GrugThis|ExplainthisRick|FrameHimJim|ExplainThisBean|ExplainThisLiu|ExplainThisTumb|BasedReplyBot|LameGPT|MrShelbySays)/gui;
// Accounts with at least this amount of followers will never be blocked.
const MIN_FOLLOWERS_COUNT = 5000;

const ignoreList = [];

mutationObserver(async () => {
    const list = [...Twitter.parseAllTweets()].filter(data => {
        if (data.text.replaceAll(BLACKLIST, '') === '') {
            if (ignoreList.includes(data.user.name)) {
                data.box.style.display = 'none';
            } else {
                ignoreList.push(data.user.name);
                return true;
            }
        }
        return false;
    });
    if (!list.length) return;

    const info = await Twitter.lookupUsers(
        list.map(data => data.user.name)
    );
    if (!info) return;

    list.forEach(async (data, index) => {
        data.info = info[index];
        if (
            data.info &&
            !data.info.following && // do not block accounts you follow
            data.info.followers_count < MIN_FOLLOWERS_COUNT
        ) {
            if (await Twitter.blockUser(data.user.name)) {
                console.log('Blocked:', data.user.url, data.box, data.tweet, data.text);
                data.box.style.display = 'none';
            }
        }
    });
});
