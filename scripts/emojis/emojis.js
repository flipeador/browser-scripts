// node --run emojis

import fs from 'node:fs';

String.prototype.toTitleCase ??= function () {
    return this.replace(/\w\S*/ug, text =>
        text[0].toUpperCase() + text.slice(1).toLowerCase()
    );
};

// VS-15, VS-16, and skin tone variations modifiers.
const reFIX = /-(FE0F|FE0E|1F3FB|1F3FC|1f3FD|1f3FE|1F3FF)/ig;

const obj = { };
// emojis.txt
// https://www.unicode.org/emoji/charts/full-emoji-list.html
const data = fs
.readFileSync('scripts/emojis/emojis.txt', 'utf8')
.replaceAll('\r', '');

for (let line of data.split('\n')) {
    line = line.split('\t');
    const index = parseInt(line[0]);
    if (index) {
        const cp = line[1]
            .replaceAll('U+', '')
            .replaceAll(' ', '-')
            .replace(reFIX, '')
            .toUpperCase();
        let name = line.at(-1)
            .replaceAll('’', '\'')
            .replaceAll('⊛ ', '')
            .toTitleCase();
        if (name.startsWith('Flag: '))
            name = name.slice(6) + ' Flag';
        obj[cp] = name;
    }
}

// Skin tone variations modifiers.
obj['1F3FB'] ??= 'Light Skin Tone';
obj['1F3FC'] ??= 'Medium-light Skin Tone';
obj['1F3FD'] ??= 'Medium skin Tone';
obj['1F3FE'] ??= 'Medium-dark Skin Tone';
obj['1F3FF'] ??= 'Dark Skin Tone';
// Emojis for v16.0β (2024).
obj['1FA89'] ??= 'Harp';
obj['1FA8F'] ??= 'Shovel';
obj['1FADF'] ??= 'Splatter';
obj['1FAC6'] ??= 'Fingerprint';
obj['1FABE'] ??= 'Leafless Tree';
obj['1FADC'] ??= 'Root Vegetable';
obj['1FAE9'] ??= 'Face With Bags Under Eyes';
obj['1F1E8-1F1F6'] ??= 'Sark Flag';
// Other emojis.
obj['1FAF1-200D-1FAF2'] ??= 'Handshake';
obj['1F9D1-200D-2764-200D-1F9D1'] ??= 'Couple With Heart: Person, Person';
obj['1F9D1-200D-2764-200D-1F48B-200D-1F9D1'] ??= 'Kiss: Person, Person';

const json = JSON.stringify(obj, Object.keys(obj).sort(), 2);
fs.writeFileSync('scripts/emojis/emojis.json', json, 'utf8');
