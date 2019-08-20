import {getWidth, getHeight} from "../global.js";
import BlueCar from "../obstacles/vehicles/BlueCar.js";


export default function RoadObjectSpawner(side)
{
    var canvasWidth = getWidth();
    var shift = canvasWidth/11.5;
    if(side == 'l')
    {
        var center = canvasWidth/4.45;
        this.lanes = [center -= shift, center, center += shift];
    }
    else if(side == 'r')
    {
        var center = canvasWidth/1.38;
        this.lanes = [center -= shift, center, center += shift];
    }
    else
    {
        throw new Error("not a lane");
    }
}

RoadObjectSpawner.prototype = {
    _frequency: 110,
    _frequencyCounter: 0,
    roadObjects: [BlueCar],
    currentObstacles: [],
    lanes: [], //x axis
    render: function()
    {
        var that = this;
        this._frequencyCounter++;
        if(that._frequencyCounter == that._frequency)
        {
            that._addObject();
            that._frequencyCounter = 0;
        }

        //spawn all objects
        //---room for optimization??
        var obstacle = null;
        for(let obst = 0; obst < that.currentObstacles.length; obst++)
        {
            obstacle = that.currentObstacles[obst];
            obstacle.render();
            if(obstacle.y == getHeight())
            {
                delete that.currentObstacles[obst];
            }
        }
    },
    _addObject: function()
    {
        var that = this;

        var object = new that.roadObjects[Math.floor(Math.random() * this.roadObjects.length)];
        object.x = that.lanes[Math.floor(Math.random() * that.lanes.length)];

        this.currentObstacles.push(object);

        object = null;
    }
}