import { Coordinate } from "./types"
import { SquareGroup } from "./SquareGroup"
import { getRamdom } from "./util"

// 子类
class TShape extends SquareGroup {
    constructor(_centerPoint: Coordinate, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color);
    }
}

class LShape extends SquareGroup {
    constructor(_centerPoint: Coordinate, _color: string) {
        super([{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }], _centerPoint, _color);
    }
}

class L2Shape extends SquareGroup {
    constructor(_centerPoint: Coordinate, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], _centerPoint, _color);
    }
}


class ZShape extends SquareGroup {
    constructor(_centerPoint: Coordinate, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color);
    }

    rotate(){
        super.rotate();
        this.isClockwise = !this.isClockwise;
    }
}

class Z2Shape extends SquareGroup {
    constructor(_centerPoint: Coordinate, _color: string) {
        super([{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }], _centerPoint, _color);
    }

    rotate() {
        super.rotate();
        this.isClockwise = !this.isClockwise;
    }
}

class LineShape extends SquareGroup {
    constructor(_centerPoint: Coordinate, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], _centerPoint, _color);
    }

    rotate() {
        super.rotate();
        this.isClockwise = !this.isClockwise;
    }
}

/** 田 */
class FieldShape extends SquareGroup {
    constructor(_centerPoint: Coordinate, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], _centerPoint, _color);
    }

    getRotateShape(): Coordinate[] {
        return this.shape;
    }

    /** 不用旋转 */
    rotate() { }
}



/** 所有组合形状的类集合 */
const shapes = [TShape, LShape, L2Shape, ZShape, Z2Shape, LineShape, FieldShape];

/** 所有颜色集合 */
const colors = ['#f00', '#fff', '#0f0', '#00f', '#ff0', '#0ff']

/**
 * 随机创建一个方块组合
 * @param centerPoint 中心点坐标
 */
export function createTetris(centerPoint: Coordinate): SquareGroup {
    const i = getRamdom(0, shapes.length),
        j = getRamdom(0, colors.length);
    return new shapes[i](centerPoint, colors[j])
}