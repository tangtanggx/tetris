import { Coordinate, IViewer } from "./types";

/** 小方块 */
export class Square {
    /** 显示者 */
    private _viewer?: IViewer

    get viewer() {
        return this._viewer;
    }

    set viewer(v) {
        this._viewer = v;
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

    constructor(private _coordinate: Coordinate, private _color: string) {

    }
}
