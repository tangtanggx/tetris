
import $ from 'jquery'

import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import { createTetris } from './core/Tetris';


const sqGroup = createTetris({ x: 8, y: 3 });
sqGroup.squareGroup.forEach(item => {
    item.viewer = new SquarePageViewer(item, $('#root'));
})


$('#btnUp').click(function () {
    sqGroup.centerPoint = {
        x: sqGroup.centerPoint.x,
        y: sqGroup.centerPoint.y - 1
    }
})

$('#btnDown').click(function () {
    sqGroup.centerPoint = {
        x: sqGroup.centerPoint.x,
        y: sqGroup.centerPoint.y + 1
    }
})

$('#btnLeft').click(function () {
    sqGroup.centerPoint = {
        x: sqGroup.centerPoint.x - 1,
        y: sqGroup.centerPoint.y
    }
})

$('#btnRight').click(function () {
    sqGroup.centerPoint = {
        x: sqGroup.centerPoint.x + 1,
        y: sqGroup.centerPoint.y
    }
})

// $('#btnRemove').click(function () {
//     if (sq.viewer) {
//         sq.viewer.remove()
//     }
// })

// $('#btnShow').click(function () {

//     sq.viewer = new SquarePageViewer(sq, $('#root'));

// })
