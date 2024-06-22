'use strict';
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_registerMenuCommand

// eslint-disable-next-line no-unused-vars
function regToggleMenuCmd(caption, callback, key, id) {
    let key2 = typeof(key) === 'string';
    if (key2) key = GM_getValue(key2 = key);
    const text = `${key?'✅':'❌'} ${caption}`;

    const obj = { };
    obj.id = GM_registerMenuCommand(
        text,
        async (event) => {
            event.enabled = !key;
            const value = await callback?.(event);
            if (value === null) return;
            if (typeof(value) === 'string')
                caption = value;
            if (key2) GM_setValue(key2, !key);
            regToggleMenuCmd(caption, callback, key2||!key, obj.id);
        },
        { id: id ?? text, autoClose: false }
    );
}
