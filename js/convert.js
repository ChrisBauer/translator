function convert (src, dest) {
    const textToConvert = document.querySelector(src).innerText;
    const destEl = document.querySelector(dest);

    const createSpanFn = (c) => {
        const el = document.createElement('span');
        el.classList.add('char');

        if (c != '.') {
            el.classList.add(c);
        }
        return el;
    };
    textToConvert.split(' ').map(createSpanFn).forEach(el => destEl.appendChild(el));
}
