import { GameStatus, MoveDirection, IGameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTetris } from "./Tetris";
import { TetrisRule } from "./TetrisRule";
import GameConfig from "./GameConfig";
import { Square } from "./Square";

export class Game {
    /** 游戏状态 */
    private _gameStatus: GameStatus = GameStatus.init
    get gameStatus() { return this._gameStatus }
    /** 当前方块 */
    private _curTetris?: SquareGroup
    /** 下一个方块 */
    private _nextTeris: SquareGroup
    /** 自动下落定时器 */
    private _timer?: number
    /** 自动下落间隔时间 */
    private _duration: number
    /** 已落下的小方块数组 */
    private _downSquares: Square[] = [];
    /** 积分 */
    private _score = 0;
    get score() {
        return this._score;
    }
    set score(val) {
        this._score = val;
        this._viewer.showScore(val); // 用访问器 实现分数变化自动调用viewer

        // 找出当前分数所属的级别
        const curLevel = GameConfig.levels.filter(it => it.score <= val).pop()!;
        // 级别发生变化要停止z之前计时，重新开始计时
        if (curLevel.duration !== this._duration) {
            this._duration = curLevel.duration;

            if (this._timer) {
                clearInterval(this._timer)
                this._timer = undefined;
                this.autoDrop();
            }
        }
    }

    constructor(private _viewer: IGameViewer) {
        this._duration = GameConfig.levels[0].duration;
        this._nextTeris = createTetris({ x: 0, y: 0 }) // 纯粹为让ts不报错
        this.CreateNext()

        // 初始化界面
        this._viewer.init(this);
        this._viewer.showScore(this.score); // 一开始显示分数

        this.start(); // 自动开始游戏
    }

    /** 初始化游戏 */
    private init() {
        // 清除之前的显示
        this._downSquares.forEach(sq => {
            if (sq.viewer) sq.viewer.remove();
        })
        this._downSquares = []
        this._curTetris = undefined;
        this.score = 0;
        this.CreateNext()

    }

    /** 创建并显示下一个方块 */
    private CreateNext() {
        this._nextTeris = createTetris({ x: 0, y: 0 })
        this.adjustTetris(this._nextTeris, GameConfig.nextSize.x);
        this._viewer.showNextTetris(this._nextTeris);
    }

    /** 游戏开始 */
    start() {
        if (this._gameStatus === GameStatus.playing) {
            return;
        }

        // 从游戏结束到开始
        if (this._gameStatus === GameStatus.gameover) {
            this.init()
        }

        this._gameStatus = GameStatus.playing;
        if (!this._curTetris) {
            this.switchTetris();
        }
        this.autoDrop();

        this._viewer.onGameStart();
    }

    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer)
            this._timer = undefined;

            this._viewer.onGamePause();
        }
    }

    /** 切换方块 */
    private switchTetris() {
        this._curTetris = this._nextTeris;
        this.adjustTetris(this._curTetris, GameConfig.panelSize.x);

        // 一开始俄罗斯方块在右侧，当游戏结束后就不会调整到游戏中间区域，所以先将其不显示
        this._curTetris.squareGroup.forEach(sq => {
            if (sq.viewer) sq.viewer.remove();
        })

        // 可能出现问题：当前方块一出现，就已经和之前方块重叠了
        if (!TetrisRule.canMove(this._curTetris.shape, this._curTetris.centerPoint, this._downSquares)) {
            // 游戏结束
            this._gameStatus = GameStatus.gameover;
            clearInterval(this._timer)
            this._timer = undefined;
            this._viewer.onGameOver();
            return;
        }

        this._viewer.switchTetris(this._curTetris)
        this.CreateNext()
    }

    /** 自动下落 */
    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) {
            return;
        }

        this._timer = setInterval(() => {
            if (this._curTetris) {
                if (!TetrisRule.move(this._curTetris, MoveDirection.Down, this._downSquares)) {
                    // 触底处理
                    this.touchBootom()
                }
            }

        }, this._duration)
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
            // TetrisRule.move(tetris, MoveDirection.Down,this._downSquares) // 如果只有一行格子会进入死循环，用下面方法强制移动
            // tetris.squareGroup.forEach(sq => sq.coordinate = { x: sq.coordinate.x, y: sq.coordinate.y + 1 }) // 不能直接改变坐标，要改变中心点
            tetris.centerPoint = { x: tetris.centerPoint.x, y: tetris.centerPoint.y + 1 }
        }
    }

    /** 触底之后的操作 */
    private touchBootom() {
        // 将当前俄罗斯方块的所有小方块加进去
        this._downSquares.push(...this._curTetris!.squareGroup)
        // 移除已满的行
        const lineNum = TetrisRule.removeAllLineSquares(this._downSquares);
        // 增加积分
        this.addScore(lineNum);
        // 切换方块
        this.switchTetris();
    }

    /**
     * 增加积分
     * @param lineNum 消除了几行
     */
    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return;
        }
        else if (lineNum === 1) {
            this.score += 10
        } else if (lineNum === 2) {
            this.score += 25
        } else if (lineNum === 3) {
            this.score += 50
        } else {
            this.score += 100
        }
    }

    controlLeft() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirection.Left, this._downSquares)
        }
    }

    controlRight() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirection.Right, this._downSquares)
        }
    }

    controlDown() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.moveFast(this._curTetris, MoveDirection.Down, this._downSquares)
            // 触底处理
            this.touchBootom()
        }
    }

    controlRotate() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.rotate(this._curTetris, this._downSquares)
        }
    }
}