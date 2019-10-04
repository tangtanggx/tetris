import { Coordinate } from "./types"
import { SquareGroup } from "./SquareGroup"
import { getRamdom } from "./util"

const TShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }]

const LShape = [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }]

const L2Shape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]

const ZShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]

const Z2Shape = [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }]

const LineShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]

const TianShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }]

/** 所有组合形状集合 */
const shapes = [TShape, LShape, L2Shape, ZShape, Z2Shape, LineShape, TianShape];

/** 所有颜色集合 */
const colors = ['#f00', '#fff', '#0f0', '#00f', '#ff0', '#0ff']

/**
 * 随机创建一个方块组合
 * @param centerPoint 中心点坐标
 */
export function createTetris(centerPoint: Coordinate) {
    const i = getRamdom(0, shapes.length),
        j = getRamdom(0, colors.length);
    return new SquareGroup(shapes[i], centerPoint, colors[j])
}