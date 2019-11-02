
import $ from 'jquery'

import { Game } from './core/Game';
import { GamePageViewer } from './core/viewer/GamePageViewer';

const viewer = new GamePageViewer()
const game = new Game(viewer);
game.start();


$('#btnDown').click(function () {
    game.controlDown()
})

$('#btnLeft').click(function () {
    game.controlLeft();
})

$('#btnRight').click(function () {
    game.controlRight()
})

$('#btnRotate').click(function () {
    game.controlRotate()
})

$('#btnPause').click(function () {
    game.pause()
})

$('#btnStart').click(function () {
    game.start()
})


