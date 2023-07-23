'use strict';

// utils.js
/* global mutationObserver */

// twitter.js
/* global Twitter */

// ==UserScript==
// @name        Twitter AI Reply Blocker
// @author      Flipeador
// @version     1.0.1
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

function checkTweetText(text) {
    return (
        text &&
        text.replaceAll(BLACKLIST, '') === ''
    );
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
