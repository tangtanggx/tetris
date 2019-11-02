import { GameStatus, MoveDirection, IGameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTetris } from "./Tetris";
import { TetrisRule } from "./TetrisRule";
import { GamePageViewer } from "./viewer/GamePageViewer";
import GameConfig from "./GameConfig";

export class Game {
    /** 游戏状态 */
    private _gameStatus: GameStatus = GameStatus.gameover
    /** 当前方块 */
    private _curTetris?: SquareGroup
    /** 下一个方块 */
    private _nextTeris: SquareGroup = createTetris({ x: 0, y: 0 })
    /** 自动下落定时器 */
    private _timer?: number
    /** 自动下落间隔时间 */
    private _timeout = 1000

    constructor(private _viewer: GamePageViewer) {
        // 显示下一个方块前调整下位置
        this.adjustTetris(this._nextTeris, GameConfig.nextSize.x);
        this._viewer.showNextTetris(this._nextTeris)

    }

    /** 游戏开始 */
    start() {
        if (this._gameStatus === GameStatus.playing) {
            return;
        }
        this._gameStatus = GameStatus.playing;
        if (!this._curTetris) {
            this.switchTetris();
        }
        this.autoDrop();
    }

    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer)
            this._timer = undefined;
        }
    }

    /** 切换方块 */
    private switchTetris() {
        this._curTetris = this._nextTeris;
        this._nextTeris = createTetris({ x: 0, y: 0 })

        this.adjustTetris(this._curTetris, GameConfig.panelSize.x);
        this._viewer.switchTetris(this._curTetris)

        this.adjustTetris(this._nextTeris, GameConfig.nextSize.x);
        this._viewer.showNextTetris(this._nextTeris)
    }

    /** 自动下落 */
    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) {
            return;
        }

        this._timer = setInterval(() => {
            if (this._curTetris) {
                TetrisRule.move(this._curTetris, MoveDirection.Down)
            }

        }, this._timeout)
    }

    /**
     * 调整初始方块的位置
     * @param tetris 
     * @param width 横向逻辑宽度
     */
    private adjustTetris(tetris: SquareGroup, width: number) {
        const x = Math.ceil(width / 2) - 1,
            y = 0;
        tetris.centerPoint = { x, y }

        // 只要有一个y坐标<0，就往下移动一下
        while (tetris.squareGroup.some(sq => sq.coordinate.y < 0)) {
            // TetrisRule.move(tetris, MoveDirection.Down) // 如果只有一行格子会进入死循环，用下面方法强制移动
            tetris.squareGroup.forEach(sq => sq.coordinate = { x: sq.coordinate.x, y: sq.coordinate.y + 1 })
        }
    }

    controlLeft() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirection.Left)
        }
    }

    controlRight() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirection.Right)
        }
    }

    controlDown() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.moveFast(this._curTetris, MoveDirection.Down)
        }
    }

    controlRotate() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.rotate(this._curTetris)
        }
    }
}