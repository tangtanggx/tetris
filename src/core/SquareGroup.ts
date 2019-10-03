import { Shape, Coordinate } from "./types";
import { Square } from "./Square";

export class SquareGroup {
    private _squareGroup: readonly Square[]

    get squareGroup() {
        return this._squareGroup
    }

    get shape(){
        return this._shape;
    }

    get centerPoint() {
        return this._centerPoint;
    }

    set centerPoint(v) {
        this._centerPoint = v;
        // 每次改变中心点，其他点坐标也改变一次
        this._squareGroup.forEach((item,i)=>{
            item.coordinate = {
                x: this._shape[i].x + this._centerPoint.x,
                y: this._shape[i].y + this._centerPoint.y
            }
        })
    }

    constructor(private _shape: Shape, private _centerPoint: Coordinate, private _color: string) {
        let arr: Square[] = [];
        _shape.forEach(item => {
            const sq = new Square()
            sq.coordinate = {
                x: item.x + _centerPoint.x,
                y: item.y + _centerPoint.y
            }
            sq.color = _color
            arr.push(sq)
        })
        this._squareGroup = arr;
    }
}