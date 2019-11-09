import { IGameViewer, GameStatus } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";

import $ from 'jquery';
import { Game } from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";

export class GamePageViewer implements IGameViewer {
    /** 游戏主面板 */
    private _panelDom = $('#panel');
    /** 右侧下一方块区域 */
    private _nextDom = $('#next');
    private _scoreDom = $('#score');
    private _msgDom = $('#msg');

    init(game: Game): void {
        // 1. 设置宽高
        this._panelDom.css({
            width: GameConfig.panelSize.x * PageConfig.SquareSize.width,
            height: GameConfig.panelSize.y * PageConfig.SquareSize.height
        });
        this._nextDom.css({
            width: GameConfig.nextSize.x * PageConfig.SquareSize.width,
            height: GameConfig.nextSize.y * PageConfig.SquareSize.height
        });

        // 2. 绑定键盘事件
        $(document).keydown(e => {
            if (e.keyCode === 37) {
                game.controlLeft()
            } else if (e.keyCode === 38) {
                game.controlRotate()
            } else if (e.keyCode === 39) {
                game.controlRight()
            } else if (e.keyCode === 40) {
                game.controlDown()
            } else if (e.keyCode === 32) {
                if (game.gameStatus === GameStatus.playing) {
                    game.pause();
                } else {
                    // 游戏暂停->游戏中   游戏结束->游戏中
                    game.start();
                }
            }
        })
    }

    showNextTetris(tetris: SquareGroup): void {
        tetris.squareGroup.forEach(sq => sq.viewer = new SquarePageViewer(sq, this._nextDom))
    }

    switchTetris(tetris: SquareGroup): void {
        tetris.squareGroup.forEach(sq => {
            // 先移除掉之前的viewer
            sq.viewer!.remove();
            sq.viewer = new SquarePageViewer(sq, this._panelDom)
        })
    }

    showScore(score: number): void {
        this._scoreDom.html(score.toString());
    }

    onGamePause(): void {
        // this._msgDom.show(); // 用jquery的show 会将display设置为block
        this._msgDom.css({ display: 'flex' });
        this._msgDom.find('p').html("暂停");
    }
    onGameStart(): void {
        this._msgDom.hide();
    }
    onGameOver(): void {
        this._msgDom.css({ display: 'flex' });
        this._msgDom.find('p').html('游戏结束');
    }
}