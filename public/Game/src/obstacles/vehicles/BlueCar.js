import BaseObstacles from "../BaseObstacles.js"
import {getImage} from "../../asset.js";
import {getHeight, getWidth} from "../../global.js";

class BlueCar extends BaseObstacles
{
    constructor(side)
    {
        this.img = getImage("blue_car.png");

        if(side == 'l')
        {
            this.height = getHeight()/6;
            this.width = getWidth()/20;
        }
    }
}