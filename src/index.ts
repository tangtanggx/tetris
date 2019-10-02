import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'

const sq = new Square({ x: 0, y: 0 }, 'red');
sq.viewer = new SquarePageViewer(sq, $('#root'));

$('#btnMove').click(function () {
    sq.coordinate = {
        x: sq.coordinate.x,
        y: sq.coordinate.y + 1
    }

})

$('#btnRemove').click(function () {
    if (sq.viewer) {
        sq.viewer.remove()
    }
})

$('#btnShow').click(function () {

    sq.viewer = new SquarePageViewer(sq, $('#root'));

})
// setInterval(() => {
//     sq.coordinate = {
//         x: sq.coordinate.x,
//         y: sq.coordinate.y + 1
//     }
// }, 1000)