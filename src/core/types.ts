import { SquareGroup } from "./SquareGroup";
import { Game } from "./Game";

/** 坐标 */
export interface Coordinate {
    readonly x: number;
    readonly y: number;
}

/** 显示者 */
export interface IViewer {
    show(): void
    remove(): void
}

/** 游戏类的显示者 */
export interface IGameViewer {
    /** 显示下一方块 */
    showNextTetris(tetris: SquareGroup): void
    /** 切换方块 */
    switchTetris(tetris: SquareGroup): void
    /** 完成界面初始化 */
    init(game: Game): void
    /** 显示分数 */
    showScore(score: number): void
    /** 游戏暂停时触发显示的东西 */
    onGamePause():void
    onGameStart():void
    onGameOver():void
}

/** 方块组合的形状 */
export type Shape = Coordinate[]

/** 移动方向 */
export enum MoveDirection {
    Left,
    Right,
    Down
}

/** 游戏状态 */
export enum GameStatus {
    /** 游戏未开始 */
    init,
    /** 进行中 */
    playing,
    /** 暂停 */
    pause,
    /** 结束 */
    gameover
}
