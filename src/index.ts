
import $ from 'jquery'

import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import { SquareGroup } from "./core/SquareGroup";


const sqGroup = new SquareGroup([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], { x: 4, y: 2 }, 'yellow')
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
