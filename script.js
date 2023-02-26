'use strict';

let color, curOpacity;
let [r, g, b, a] = [0, 0, 0, 0.1];
const GRIDSIZE = '32';
const grid = document.querySelector('.grid');
const sizeInput = document.querySelector('#size');
const checkbox = document.querySelector('#chk')
const colorText = document.querySelector('.color')
const getRandomColor = function () {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
};
const createGrid = function () {
    let gridsize = parseInt(sizeInput.value);
    if (Number.isNaN(gridsize)) {
        alert('Invalid number.');
        return;
    }
    if (gridsize < 1 || gridsize > 100) {
        alert('Please enter a size between 1 and 100.');
        return;
    }
    const fragment = document.createDocumentFragment();
    const boxsize = 100 / gridsize;

    for (let i = 0; i < gridsize * gridsize; i++) {
        const div = document.createElement('div');
        div.className = 'box';
        div.style.width = `${boxsize}%`;
        div.style.height = `${boxsize}%`;
        fragment.appendChild(div);
    }
    grid.style.width = `${GRIDSIZE}vw`;
    grid.style.height = `${GRIDSIZE}vw`;
    grid.appendChild(fragment);
};
const changeGrid = function () {
    grid.innerHTML = "";
    createGrid();
};

window.addEventListener('DOMContentLoaded', () => {
    sizeInput.value = 16;
    createGrid();
    if (checkbox.checked) {
        colorText.classList.add('selected');
        getRandomColor();
    }
    else {
        colorText.classList.remove('selected');
        [r, g, b] = [0, 0, 0];
    }
});

sizeInput.addEventListener('change', changeGrid);

grid.addEventListener('mouseover', e => {
    if (e.target.classList.contains('box')) {
        color = window.getComputedStyle(e.target).backgroundColor;
        if (color.includes('rgba')) {
            curOpacity = parseFloat(color.slice(color.lastIndexOf(',') + 1, -1));
        } else {
            curOpacity = 1;
        }
        e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${Math.min(a + curOpacity, 1)})`;
    }
});

grid.addEventListener('mouseleave', function () {
    if (checkbox.checked) {
        getRandomColor()
    }
});

checkbox.addEventListener('change', function () {
    if (this.checked) {
        colorText.classList.add('selected');
        getRandomColor();
    }
    else {
        colorText.classList.remove('selected');
        [r, g, b] = [0, 0, 0];
    }
})