import BaseObstacles from "../BaseObstacles.js"
import {getImage} from "../../asset.js";
import {getHeight, getWidth, getCanvas} from "../../global.js";

export default function GreenTruck()
{
    this.img = getImage("green_truck.png");
    this.speed = 3; 
    this.height = getHeight()/5.5;
    this.width = getWidth()/20;
    this._canvas = getCanvas();
}

GreenTruck.prototype = BaseObstacles.prototype;