
import $ from 'jquery'

import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import { createTetris } from './core/Tetris';
import { Coordinate, MoveDirection } from './core/types';
import { TetrisRule } from './core/TetrisRule';


const sqGroup = createTetris({ x: 8, y: 3 });
sqGroup.squareGroup.forEach(item => {
    item.viewer = new SquarePageViewer(item, $('#root'));
})


$('#btnUp').click(function () {
    TetrisRule.move(sqGroup, {
        x: sqGroup.centerPoint.x,
        y: sqGroup.centerPoint.y - 1
    })
})

$('#btnDown').click(function () {
    // TetrisRule.move(sqGroup, MoveDirection.Down)
    TetrisRule.moveFast(sqGroup, MoveDirection.Down);
})

$('#btnLeft').click(function () {
    // TetrisRule.move(sqGroup, MoveDirection.Left)
    TetrisRule.moveFast(sqGroup, MoveDirection.Left);
})

$('#btnRight').click(function () {
    // TetrisRule.move(sqGroup, MoveDirection.Right)
    TetrisRule.moveFast(sqGroup, MoveDirection.Right);
})

// $('#btnRemove').click(function () {
//     if (sq.viewer) {
//         sq.viewer.remove()
//     }
// })

// $('#btnShow').click(function () {

//     sq.viewer = new SquarePageViewer(sq, $('#root'));

// })
