import { IGameViewer } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";

import $ from 'jquery';

export class GamePageViewer implements IGameViewer {
    showNextTetris(tetris: SquareGroup): void {
        tetris.squareGroup.forEach(sq => sq.viewer = new SquarePageViewer(sq, $('#next')))
    }

    switchTetris(tetris: SquareGroup): void {
        tetris.squareGroup.forEach(sq => {
            // 先移除掉之前的viewer
            sq.viewer!.remove();
            sq.viewer = new SquarePageViewer(sq, $('#panel'))
        })
    }


}