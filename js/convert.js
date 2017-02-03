function convert (src, dest) {
    const textToConvert = document.querySelector(src).innerText;
    const destEl = document.querySelector(dest);

    const createSpanFn = (c) => {
        const el = document.createElement('span');
        el.classList.add('char');

        if (c != '~') {
            el.classList.add(c);
        }
        return el;
    };

    createWordEl = () => {
        const el = document.createElement('div');
        el.classList.add('word');
        return el;
    };

    const simple = convertFromIPA(textToConvert);
    const words = simple.split('~');
    words.map(word => ({word: word, wordEl: createWordEl()})).forEach(({word, wordEl}) => {
        word.trim().split(' ').map(createSpanFn).forEach(charEl => wordEl.appendChild(charEl));
        destEl.appendChild(wordEl);
    });
    // simple.split(' ').map(createSpanFn).forEach(el => destEl.appendChild(el));
}

function convertFromIPA (text) {
    const chars = [];
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i).match(/\s/)) {
            chars.push('~');
        }
        else {
            let c = text.charAt(i);
            if (i == text.length - 1 || prefixChars.indexOf(c) == -1) {
                chars.push(ipaMap[c]);
            }
            else {
                const twoChars = c + text.charAt(i + 1);
                if (ipaMap[twoChars]) {
                    chars.push(ipaMap[twoChars]);
                    i++;
                }
                else if (ipaMap[c]) {
                    chars.push(ipaMap[c]);
                }
                else {
                    // this is the case where we couldn't find it at all
                    // just add the IPA character
                    chars.push(c);
                }
            }
        }
    }
    return chars.join(' ');
}

const ipaMap = {
    ɔ: 'AA', // dAWn
    æ: 'AE', // hAt
    ʌ: 'AH', // bUt
    ə: 'AH', // About
    ɑ: 'AA', // dOn
    aʊ: 'AW', // hOW
    aɪ: 'AY', // I
    b: 'B', // But
    ʧ: 'CH', // CHeer
    d: 'D', // Dawn
    ð: 'DH', // THee
    ɛ: 'EH', // bEd
    ɜ: 'AH', // hUrt
    eɪ: 'EY', // wAIt
    f: 'F', // Forget
    g: 'G', // forGet
    h: 'HH', // Happy
    i: 'IY', // fEE
    ʤ: 'JH', // Jump
    k: 'K', // Call
    l: 'L', // caLL
    m: 'M', // Man
    n: 'N', // maN
    ŋ: 'NG', // haNG
    ɔɪ: 'OY', // vOIce
    p: 'P', // Parse
    r: 'R', // paRse
    s: 'S', // parSe
    ʃ: 'SH', // SHut
    t: 'T', // shuT
    θ: 'TH', // THank
    ʊ: 'UH', // wOUld
    u: 'UW', // blUE
    v: 'V', // Vow
    w: 'W', // Well
    j: 'Y', // Yes
    z: 'Z', // plaZa
    ʒ: 'ZH' // garaGe
};

// Build a list of prefix chars - that is, IPA characters which
// may be part of a multiple-character phoneme.
const prefixChars = Object.keys(ipaMap).filter(key => key.length > 1).map(key => key.charAt(0));
