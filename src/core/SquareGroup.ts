import { Shape, Coordinate } from "./types";
import { Square } from "./Square";

export class SquareGroup {
    private _squareGroup: readonly Square[]
    /** 旋转方向是否顺时针 */
    protected isClockwise = true;

    get squareGroup() {
        return this._squareGroup
    }

    get shape() {
        return this._shape;
    }

    get centerPoint() {
        return this._centerPoint;
    }

    set centerPoint(v) {
        this._centerPoint = v;
        // 每次改变中心点，其他点坐标也改变一次
        this.setSquareGroup();
    }

    constructor(private _shape: Shape, private _centerPoint: Coordinate, private _color: string) {
        let arr: Square[] = [];
        _shape.forEach(item => {
            const sq = new Square()
            sq.color = _color
            arr.push(sq)
        })
        this._squareGroup = arr;
        this.setSquareGroup();
    }

    /** 根据中心点和形状，设置方块的形状数组 */
    private setSquareGroup() {
        this._squareGroup.forEach((item, i) => {
            item.coordinate = {
                x: this._shape[i].x + this._centerPoint.x,
                y: this._shape[i].y + this._centerPoint.y
            }
        })
    }

    /** 计算旋转后的形状 */
    getRotateShape(): Coordinate[] {
        let newShape: Coordinate[];
        if (this.isClockwise) {
            newShape = this._shape.map(item => ({ x: -item.y, y: item.x }));
        } else {
            newShape = this._shape.map(item => ({ x: item.y, y: -item.x }));
        }
        return newShape;
    }

    rotate() {
        this._shape = this.getRotateShape();
        this.setSquareGroup();
    }
}