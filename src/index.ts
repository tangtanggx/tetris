import { Square } from "./core/Square";
import { IViewer } from "./core/types";

class SquareConsoleViewer implements IViewer {
    constructor(private _square: Square) { }

    show(): void {
        console.log(this._square.coordinate, this._square.color)
    }

    remove(): void {

    }
}

const sq = new Square({ x: 0, y: 0 }, "#f00");

sq.viewer = new SquareConsoleViewer(sq);
sq.viewer.show();

