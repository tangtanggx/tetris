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

/** 方块组合的形状 */
export type Shape = Coordinate[]