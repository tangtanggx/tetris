import { SquareGroup } from "./SquareGroup";
import { Coordinate, Shape, MoveDirection } from "./types";
import GameConfig from "./GameConfig";
import { Square } from "./Square";


/** 该类提供一系列函数 */
export class TetrisRule {

    /** 判断某个形状的方块组合是否能够移动到目标位置 */
    static canMove(shape: Shape, targetCenterPoint: Coordinate, downSquares: Square[]): boolean {
        // 假设移动到目标点后，计算出每个小方块的坐标
        const newPoints: Coordinate[] = shape.map(item => ({
            x: item.x + targetCenterPoint.x,
            y: item.y + targetCenterPoint.y
        }))

        // 边界判断 some是否有元素满足条件
        let result = newPoints.some(item => item.x < 0 || item.x > GameConfig.panelSize.x - 1 || item.y < 0 || item.y > GameConfig.panelSize.y - 1);
        if (result) return false;

        // 判断是否与已有的方块重叠，只要找到一个result的值就为true
        result = newPoints.some(p => {
            return downSquares.some(dsq => (dsq.coordinate.x === p.x) && (dsq.coordinate.y === p.y))
        })

        if (result) return false;

        return true;
    }

    /** 根据方向移动 */
    static move(tetris: SquareGroup, direction: MoveDirection, downSquares: Square[]): boolean
    /** 根据传入目标点移动 */
    static move(tetris: SquareGroup, targetPoint: Coordinate, downSquares: Square[]): boolean

    static move(tetris: SquareGroup, directionOrTarget: MoveDirection | Coordinate, downSquares: Square[]): boolean {
        if (isCoordinate(directionOrTarget)) {

            const targetPoint = directionOrTarget;
            if (this.canMove(tetris.shape, targetPoint, downSquares)) {
                tetris.centerPoint = targetPoint;
                return true;
            }
            return false;
        }
        else {
            const direction = directionOrTarget;

            if (direction === MoveDirection.Left)
                return this.move(tetris, { x: tetris.centerPoint.x - 1, y: tetris.centerPoint.y }, downSquares);

            else if (direction == MoveDirection.Right)
                return this.move(tetris, { x: tetris.centerPoint.x + 1, y: tetris.centerPoint.y }, downSquares);
            else
                return this.move(tetris, { x: tetris.centerPoint.x, y: tetris.centerPoint.y + 1 }, downSquares);
        }
    }

    /**
     * 向一个方向快速移动
     * @param tetris 
     * @param direction 方向
     * @param downSquares 已经下落的方块数组
     */
    static moveFast(tetris: SquareGroup, direction: MoveDirection, downSquares: Square[]) {
        if (direction === MoveDirection.Left)
            while (this.move(tetris, { x: tetris.centerPoint.x - 1, y: tetris.centerPoint.y }, downSquares)) { }

        else if (direction == MoveDirection.Right)
            while (this.move(tetris, { x: tetris.centerPoint.x + 1, y: tetris.centerPoint.y }, downSquares)) { }

        else
            while (this.move(tetris, { x: tetris.centerPoint.x, y: tetris.centerPoint.y + 1 }, downSquares)) { }
    }

    /**
     * 方块旋转
     * @param tetris 需要旋转的俄罗斯方块
     * @param downSquares 已经下落的方块数组
     */
    static rotate(tetris: SquareGroup, downSquares: Square[]): boolean {
        const newShape = tetris.getRotateShape();
        if (this.canMove(newShape, tetris.centerPoint, downSquares)) {
            tetris.rotate();
            return true;
        } else return false;
    }

    /**
     * 移除所有占满一行的方块
     * @param {Square[]} downSquares
     * @returns {number} 返回移除的行数
     */
    static removeAllLineSquares(downSquares: Square[]): number {
        // 1. 得到所有行的数组
        const ys = downSquares.map(sq => sq.coordinate.y);
        // 2. 计算最大行数和最小行数
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        let num = 0; // 计数移除几行
        for (let y = minY; y <= maxY; y++) {
            if (this.removeLine(downSquares, y)) {
                num++;
            }
        }
        return num;

    }

    /**
     * 消除一行
     * @param downSquares 
     * @param y 行号
     */
    private static removeLine(downSquares: Square[], y: number): boolean {
        // 找到这一行所有方块
        const lineSquares = downSquares.filter(sq => sq.coordinate.y === y);
        // 如果数组长度 === 界面的逻辑宽度 说明这一行满了
        if (lineSquares.length === GameConfig.panelSize.x) {
            lineSquares.forEach(sq => {
                // 1. 移除这一行
                if (sq.viewer) {
                    sq.viewer.remove();
                }

                // 2.从downSquares中移除
                const idx = downSquares.indexOf(sq);
                downSquares.splice(idx, 1);
            })

            // 剩下y坐标比他小的所有方块y+1
            downSquares.forEach(sq => {
                if (sq.coordinate.y < y) {
                    sq.coordinate = { x: sq.coordinate.x, y: sq.coordinate.y + 1 }
                }
            })
            return true;
        }
        return false;
    }
}

/** 类型保护函数 */
function isCoordinate(target: any): target is Coordinate {
    return target.x !== undefined
}

