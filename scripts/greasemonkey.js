/* eslint-disable strict, no-unused-vars */
'use strict';

function registerToggleMenuCmd(key, name) {
    const action = GM_getValue(key) ? 'Disable' : 'Enable';
    registerToggleMenuCmd[key] = GM_registerMenuCommand(
        `${action}: ${name}`, () => {
            GM_setValue(key, !GM_getValue(key));
            GM_unregisterMenuCommand(registerToggleMenuCmd[key]);
            registerToggleMenuCmd(key, name);
        }
    );
}
