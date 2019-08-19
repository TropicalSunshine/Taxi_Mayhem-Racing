import {getHeight, getWidth, getCanvas} from "../global.js";

export default class BaseObstacles
{
    constructor(side)
    {
        this._canvasHeight = getHeight;
        this._canvasWidth = getWidth;

        this.side = side;
    }
}

BaseObstacles.prototype  = {
    img: null,
    side: null,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    speed: 0,
    _canvasWidth: 0,
    _canvasHeight: 0,
    render: function()
    {
        getCanvas().drawImage(this.img, this.x, this.y,
                                this.width, this.height)
    },
    getCordinates: function()
    {
        var that = this;
        
        return {
            x: that.x,
            y: that.y,
            width: that.width,
            height: that.height
        }
    }
}