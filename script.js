'use strict';

const GRIDWIDTH = '32';
const grid = document.querySelector('.grid');
const size = document.querySelector('#size').value;
const createGrid = function (gridSize) {
    gridSize = parseInt(size);
    const fragment = document.createDocumentFragment();
    const boxSize = 100 / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
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
let color, curOpacity;
let [r, g, b, a] = [0, 0, 0, 0.1];
window.addEventListener('DOMContentLoaded', createGrid);

grid.addEventListener('mouseover', e => {
    if (e.target.classList.contains('box')) {
        color = window.getComputedStyle(e.target).backgroundColor;
        if (color.includes('rgba')) {
            curOpacity = parseFloat(color.slice(color.lastIndexOf(',') + 1, -1).trim())
        } else {
            curOpacity = 1;
        }
        e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${Math.min(a + curOpacity, 1)})`;
    }
});