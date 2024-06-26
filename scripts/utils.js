/* eslint-disable no-unused-vars */
'use strict';

function search(re, str, cbmatch, cbother) {
    re.lastIndex = 0;
    let count = 0, index = 0, match;
    while (match = re.exec(str)) {
        if (match.index !== index)
            cbother?.(str.slice(index, match.index));
        cbmatch?.(...match);
        index = re.lastIndex;
        ++count;
    }
    if (index < str.length)
        cbother?.(str.slice(index));
    return count;
}

function cookies(...list) {
    const cookies = document.cookie.split(';')
    .map(cookie => cookie.trim().split('='))
    .reduce((cookies, cookie) => {
        cookies[cookie[0]] = cookie[1];
        return cookies;
    }, {});

    if (list.length === 0)
        return cookies;

    if (list.length === 1)
        return cookies[list[0]];

    return list.map(name => cookies[name]);
}

function ajax(url, init) {
    return fetch(
        url, init
    ).then(
        response => (
            response.ok
            ? response.json().then(data => data || {})
            : null
        ),
        () => null
    );
}

function isIntersecting(entries, trackVisibility) {
    for (const entry of entries)
        if (entry.isIntersecting && (!trackVisibility || entry.isVisible !== false))
            return entry;
}

function getClosestElement(node) {
    while (node && !(node instanceof Element))
        node = node.parentNode;
    return node;
}

function mutationObserver(callback, root=document.body, delay=500) {
    mutationObserver.timer = setTimeout(() => callback({ root }), delay);
    new MutationObserver((records, observer) => {
        clearTimeout(mutationObserver.timer);
        mutationObserver.timer = setTimeout(() => {
            return callback({ root, records, observer });
        }, delay);
    }).observe(root, { subtree: true, childList: true });
}

function querySelector(query, counter=Infinity) {
    return new Promise(resolve => {
        const obj = { };
        obj.timer = setInterval(
            () => {
                const element = document.querySelector(query);
                if (element || --counter < 1) {
                    resolve(element);
                    clearInterval(obj.timer);
                }
            },
            1000
        );
    });
}
