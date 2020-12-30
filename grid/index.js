import Grid, { rgbToHexString } from './js/Grid.js';

$(document).ready(() => {
      
    let grid; 

    // event listeners

    // reset grid
    $(".button-reset")
        .click(() => {
            grid.renderToDOM('.grid-container', true);
        });
    
    // create new grid toggler
    $(".create-grid-menu-trigger")
        .click(() => {
            $("#create-grid-menu").toggle();
        });

    // create new grid
    $(".create-grid-menu-trigger.btn-ok").click(() => {
        const oldGrid = document.querySelector('.grid');
        if (oldGrid) {
            oldGrid.parentNode.removeChild(oldGrid);
        }

        const length = $("#dimension")[0].valueAsNumber;
        grid = new Grid(length);
        grid.renderToDOM('.grid-container');
    });
    
    // color picker menu toggler
    $(".color-menu-trigger")
        .click(() => {
            $("#color-menu").toggle();
        });

    // change color preview
    $(".red-range, .green-range, .blue-range")
        .change(() => {
            const red = $(".red-range")[0].valueAsNumber;
            const green = $(".green-range")[0].valueAsNumber;
            const blue = $(".blue-range")[0].valueAsNumber;
            
            const color = rgbToHexString(red, green, blue);

            $(".color-preview").css("background-color", color);
            // grid.ActiveColor = color;
        });

    // change color
    $(".color-menu-trigger.btn-ok").click(() => {
        const red = $(".red-range")[0].valueAsNumber;
        const green = $(".green-range")[0].valueAsNumber;
        const blue = $(".blue-range")[0].valueAsNumber;
        
        const color = rgbToHexString(red, green, blue);
        grid.ActiveColor = color;
    });
});