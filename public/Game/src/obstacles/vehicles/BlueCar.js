import BaseObstacles from "../BaseObstacles.js"
import {getImage} from "../../asset.js";
import {getHeight, getWidth, getCanvas} from "../../global.js";

export default function BlueCar()
{
    this.img = getImage("blue_car.png");
    this.speed = 4; 
    this.height = getHeight()/6;
    this.width = getWidth()/20;
    this._canvas = getCanvas();
}

BlueCar.prototype = BaseObstacles.prototype;