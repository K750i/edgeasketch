'use strict';

let color, curOpacity;
let [r, g, b, a] = [0, 0, 0, 0.2];
const grid = document.querySelector('.grid');
const smallBtn = document.querySelector('.button.small');
const mediumBtn = document.querySelector('.button.medium');
const bigBtn = document.querySelector('.button.big');
const clearBtn = document.querySelector('.clear');
const checkbox = document.querySelector('#chk')
const colorText = document.querySelector('.color')
const getRandomColor = function () {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
};
const createGrid = function (size) {
    const fragment = document.createDocumentFragment();
    const boxsize = 100 / size;

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.className = 'box';
        div.style.width = `${boxsize}%`;
        div.style.height = `${boxsize}%`;
        fragment.appendChild(div);
    }

    grid.appendChild(fragment);
};
const changeGrid = function (size) {
    grid.innerHTML = "";
    createGrid(size);
};

window.addEventListener('DOMContentLoaded', function () {
    createGrid(16);
    if (checkbox.checked) {
        colorText.classList.add('selected');
        getRandomColor();
    }
    else {
        colorText.classList.remove('selected');
        [r, g, b] = [0, 0, 0];
    }
});

smallBtn.addEventListener('click', () => changeGrid(8));
mediumBtn.addEventListener('click', () => changeGrid(16));
bigBtn.addEventListener('click', () => changeGrid(48));
clearBtn.addEventListener('click', function () {
    [...grid.children].forEach(node => node.style.background = '');
});

grid.addEventListener('mouseover', function (e) {
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