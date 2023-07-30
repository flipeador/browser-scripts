/* eslint-disable strict, no-unused-vars */
'use strict';

// utils.js
/* global cookies, ajax */

class Twitter
{
    static TOKEN = 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';

    static api(path, params) {
        return ajax(
            // https://developer.twitter.com/en/docs/twitter-api/v1
            `https://api.twitter.com/1.1/${path}?${new URLSearchParams(params)}`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${Twitter.TOKEN}`,
                    'X-Twitter-Auth-Type': 'OAuth2Session',
                    'X-Twitter-Active-User': 'yes',
                    'X-Csrf-Token': cookies('ct0'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }

    static async lookupUsers(name) {
        return Twitter.api('users/lookup.json', {
            screen_name: (
                name instanceof Array
                ? name.join(',') // 1-100
                : name
            )
        });
    }

    static async blockUser(name) {
        return Twitter.api('blocks/create.json', {
            screen_name: name
        });
    }

    static getTweetText(tweet) {
        let text = '';
        for (const node of tweet.childNodes)
            text += node.alt ?? node.innerText;
        return text;
    }

    static getUserFromTweetBox(box) {
        const authorUrl = box.querySelector('a').href;
        return {
            url: authorUrl,
            name: decodeURIComponent(
                authorUrl.slice(
                    authorUrl.lastIndexOf('/') + 1
                )
            )
        };
    }

    static *parseAllTweets() {
        const tweets = document.querySelectorAll('[data-testid="tweetText"]');
        for (const tweet of tweets || []) {
            const box = tweet.closest('[data-testid="cellInnerDiv"]');
            if (box) yield {
                box,
                tweet,
                user: Twitter.getUserFromTweetBox(box),
                text: Twitter.getTweetText(tweet)
            };
        }
    }
}
