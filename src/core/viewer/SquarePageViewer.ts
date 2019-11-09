import { IViewer } from "../types";
import { Square } from "../Square";
import PageConfig from "./PageConfig";
import $ from 'jquery'



export class SquarePageViewer implements IViewer {

    private dom?: JQuery<HTMLElement>
    private isRemove: boolean = false

    constructor(private _square: Square, private _container: JQuery<HTMLElement>) { }

    show(): void {
        if (this.isRemove) return;

        if (!this.dom) {
            this.dom = $('<div>').css({
                position: 'absolute',
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                border: '1px solid #fff',
                boxSizing: "border-box"
            }).appendTo(this._container);

        }

        this.dom.css({
            left: this._square.coordinate.x * PageConfig.SquareSize.width,
            top: this._square.coordinate.y * PageConfig.SquareSize.height,
            background: this._square.color
        })

    }

    remove(): void {
        if (this.dom && !this.isRemove) {
            this.dom.remove();
            this.isRemove = true;
        }
    }
}