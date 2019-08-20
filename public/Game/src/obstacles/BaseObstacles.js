import {getHeight, getWidth, getCanvas} from "../global.js";

export default function BaseObstacles()
{
    this._canvasHeight = getHeight;
    this._canvasWidth = getWidth;
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
    _canvas: null,
    render: function()
    {
        this._update(); 
        this._canvas.drawImage(this.img, this.x, this.y - this.height,
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
    },
    _update: function()
    {
        this.y += this.speed;
    }
}