'use strict';

const GRIDWIDTH = '32';
const grid = document.querySelector('.grid');
const createGrid = function (qty) {
    qty = 32;
    const fragment = document.createDocumentFragment();
    const boxSize = 100 / qty;

    for (let i = 0; i < qty * qty; i++) {
        const div = document.createElement('div');
        div.className = 'box';
        div.style.width = `${boxSize}%`;
        div.style.height = `${boxSize}%`;
        fragment.appendChild(div);
    }
    grid.style.width = `${GRIDWIDTH}vw`;
    grid.style.height = `${GRIDWIDTH}vw`;
    grid.appendChild(fragment);
};

window.addEventListener('DOMContentLoaded', createGrid);
grid.addEventListener('mouseover', e => {
    e.target.style.backgroundColor = 'darkslateblue';
});