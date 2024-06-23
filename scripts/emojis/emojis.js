// node --run emojis

import fs from 'node:fs';

String.prototype.toTitleCase ??= function () {
    return this.replace(/\w\S*/ug, text =>
        text[0].toUpperCase() + text.slice(1).toLowerCase()
    );
};

const obj = { };
// https://www.unicode.org/emoji/charts/full-emoji-list.html
const data = fs.readFileSync('scripts/emojis/emojis.txt', 'utf8');

for (let line of data.split('\n')) {
    line = line.split('\t');
    const index = parseInt(line[0]);
    if (index) {
        const cp = line[1]
            .replaceAll('U+', '')
            .replaceAll(' ', '-')
            .toLowerCase();
        let name = line.at(-1)
            .replaceAll('\r', '')
            .replaceAll('’', '\'')
            .replaceAll('⊛ ', '')
            .toTitleCase();
        if (name.startsWith('Flag: '))
            name = name.slice(6) + ' Flag';
        obj[cp] = name;
    }
}

const json = JSON.stringify(obj, null, 2);
fs.writeFileSync('scripts/emojis/emojis.json', json, 'utf8');
