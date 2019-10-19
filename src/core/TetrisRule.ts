import { SquareGroup } from "./SquareGroup";
import { Coordinate, Shape, MoveDirection } from "./types";
import GameConfig from "./GameConfig";


/** 该类提供一系列函数 */
export class TetrisRule {

    /** 判断某个形状的方块组合是否能够移动到目标位置 */
    static canMove(shape: Shape, targetPoint: Coordinate): boolean {
        // 假设移动到目标点后，计算出每个小方块的坐标
        const targetPoints: Coordinate[] = shape.map(item => ({
            x: item.x + targetPoint.x,
            y: item.y + targetPoint.y
        }))
        // 边界判断 some是否有元素满足条件
        const result = targetPoints.some(item => item.x < 0 || item.x > GameConfig.panelSize.width - 1 || item.y < 0 || item.y > GameConfig.panelSize.height - 1);
        return !result;
    }

    /** 根据方向移动 */
    static move(tetris: SquareGroup, direction: MoveDirection): boolean
    /** 根据传入目标点移动 */
    static move(tetris: SquareGroup, targetPoint: Coordinate): boolean
    static move(tetris: SquareGroup, directionOrTarget: MoveDirection | Coordinate): boolean {
        if (isCoordinate(directionOrTarget)) {
            const targetPoint = directionOrTarget;
            if (this.canMove(tetris.shape, targetPoint)) {
                tetris.centerPoint = targetPoint;
                return true;
            }
            return false;
        }
        else {
            const direction = directionOrTarget;
            if (direction === MoveDirection.Left)
                return this.move(tetris, { x: tetris.centerPoint.x - 1, y: tetris.centerPoint.y });

            else if (direction == MoveDirection.Right)
                return this.move(tetris, { x: tetris.centerPoint.x + 1, y: tetris.centerPoint.y });
            else
                return this.move(tetris, { x: tetris.centerPoint.x, y: tetris.centerPoint.y + 1 });
        }
    }

    /** 向一个方向快速移动 */
    static moveFast(tetris: SquareGroup, direction: MoveDirection) {
        if (direction === MoveDirection.Left)
            while (this.move(tetris, { x: tetris.centerPoint.x - 1, y: tetris.centerPoint.y })) { }

        else if (direction == MoveDirection.Right)
            while (this.move(tetris, { x: tetris.centerPoint.x + 1, y: tetris.centerPoint.y })) { }

        else
            while (this.move(tetris, { x: tetris.centerPoint.x, y: tetris.centerPoint.y + 1 })) { }
    }

    /** 方块旋转 */
    static rotate(tetris: SquareGroup): boolean {
        const newShape = tetris.getRotateShape();
        if (this.canMove(newShape, tetris.centerPoint)) {
            tetris.rotate();
            return true;
        } else return false;
    }
}

/** 类型保护函数 */
function isCoordinate(target: any): target is Coordinate {
    return target.x !== undefined
}

