'use strict'

const GRID_BG_RGB_HEX = "#FFFFFF";

export default class Grid {

    get Length(){
        return this.length;
    }

    get BgColor() {
        return this.bgColor;
    }

/*     get IsColored() {
        return this.IsColored;
    }

    set IsColored(coloredState) {
        this.isColored = coloredState;
    }
 */
    get Cells() {
        return this.cells;
    }

/*     get IsColorPickedByUser() {
        return this.isColorPickedByUser;
    }

    set IsColorPickedByUser(isPicked) {
        this.isColorPickedByUser = isPicked;
    }
 */
    get ActiveColor() {
        return this.activeColor;
    }

    set ActiveColor(color) {
        this.activeColor = color;
    }

    constructor(length = 8, bgColor = GRID_BG_RGB_HEX) {
        this.length = length;
        //this.isColored = false;
        this.bgColor = bgColor;
        this.activeColor = rgbToHexString( ...randomRGB() );
        this.cells = initCellArray(length, bgColor);
    }

    getCellAt = (row, column) => this.cells[row][column];

    renderToDOM = (mountPointSelector, reset = false) => {

        if (reset === true) {
            console.log('reset je true');
            const oldGrid = document.querySelector('.grid');
            oldGrid.parentNode.removeChild(oldGrid);
        }

        if (this.Cells.length > 0) {
            
            const gridLength = this.Length;
            let root = document.documentElement;
            root.style.setProperty('--columns', gridLength);
            const grid = document.createElement('div');
            grid.className = 'grid';

            for (let i = 0; i < gridLength; i++) {
                for (let j = 0; j < gridLength; j++) {                    
                    
                    const cell = document.createElement('div');
                    cell.setAttribute('data-x', j);
                    cell.setAttribute('data-y', i);
                    cell.className = 'cell';
                                        
                    grid.appendChild(cell)
                }        
            }

            grid.addEventListener('mouseover', (e) => {

                const x = +e.target.dataset.x;
                const y = +e.target.dataset.y;

                const activeCell = e.target;

                if (this.activeColor !== this.cells[x][y].toLowerCase()) {
                    activeCell.style.backgroundColor = this.activeColor;
                    this.cells[x][y] = this.activeColor;
                } else {
                    activeCell.style.backgroundColor = this.bgColor;
                    this.cells[x][y] = this.bgColor;
                }
            });

            const container = document.querySelector(mountPointSelector);
            container.appendChild(grid);
        }
    }   
    
}

// #region Utility functions
/**
 * 
 * @param {*} length 
 * @param {*} bgColor 
 */

const initCellArray = (length, bgColor) => {
    const cells = new Array(length);

    for (let row = 0; row < length; row++) {
        cells[row] = new Array(length);
        for (let column = 0; column < length; column++) {
            cells[row][column] = bgColor;
        }
    }

    return cells;
}

const randomRGB = () => [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];

export const rgbToHexString = (r, g, b) => [ r, g, b ]
                                                .map((num) => num.toString(16).padStart(2, '0'))
                                                .reduce((acc, curr) => acc + curr, '#');

// #endregion
