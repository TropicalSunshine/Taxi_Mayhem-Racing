import {getWidth, getHeight} from "../global.js";
import BlueCar from "../obstacles/vehicles/BlueCar.js";
import GreenTruck from "../obstacles/vehicles/GreenTruck.js";
import { DH_CHECK_P_NOT_SAFE_PRIME } from "constants";

export default function RoadObjectSpawner(side)
{
    var canvasWidth = getWidth();
    this.canvasWidth = canvasWidth;
    this.canvasHeight = getHeight();
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
    _frequency: 100,
    _frequencyCounter: 0,
    roadObjects: [BlueCar, GreenTruck],
    currentObstacles: [],
    lanes: [], //x axis
    canvasHeight: 0, 
    canvasWidth: 0,
    playerCords: null,
    isCollision: false,
    isSpawn: false,
    render: function()
    {
        var that = this;
        this._frequencyCounter++;
        if(that.isSpawn && that._frequencyCounter == that._frequency)
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

            if((obstacle.y) >= that.playerCords.y && obstacle.x === that.playerCords.x)
            {
                that.isCollision = true; //callback function for taxi to take damage
            }

            if(obstacle.y - obstacle.height >= that.canvasHeight)
            {
               that.currentObstacles.splice(obst, 1);
            }
        }

    },
    _addObject: function()
    {
        var that = this;

        var object = new that.roadObjects[Math.floor(Math.random() * that.roadObjects.length)];
        object.x = that.lanes[Math.floor(Math.random() * that.lanes.length)];

        this.currentObstacles.push(object);

        object = null;
    },
    changeFrequency: function(freq)
    {
        this._frequency = freq;
    },
    checkCollision: function(cords)
    {
        this.playerCords = cords;
        var result = this.isCollision;
        this.isCollision = false;
        return result;
    }, 
    stop: function()
    {
        this.isSpawn = false;
        this._frequencyCounter = 0;
    },
    start: function()
    {
        this.isSpawn = true;
    }
}