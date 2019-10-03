import { Coordinate, IViewer } from "./types";

/** 小方块 */
export class Square {
    /** 显示者 */
    private _viewer?: IViewer
    private _coordinate: Coordinate = { x: 0, y: 0 }
    private _color: string = "#000"

    get viewer() {
        return this._viewer;
    }

    set viewer(v) {
        this._viewer = v;
        if (v) {
            v.show();
        }
    }

    get coordinate() {
        return this._coordinate;
    }

    set coordinate(val) {
        this._coordinate = val;

        // 坐标变化显示
        if (this._viewer) {
            this._viewer.show();
        }
    }

    get color() {
        return this._color;
    }

    set color(v) {
        this._color = v;
    }

    constructor() { }
}
