import {getWidth, getHeight} from "../global.js";
import BlueCar from "../obstacles/vehicles/BlueCar.js";
import GreenTruck from "../obstacles/vehicles/GreenTruck.js";

export default function RoadObjectSpawner(side)
{
    var canvasWidth = getWidth();
    this.canvasWidth = canvasWidth;
    this.canvasHeight = getHeight();

    this.spawnLanes = sessionStorage.lanes;

    var shift = canvasWidth/11.5;
    if(side == 'l')
    {
        this.spawnIndex = 0;
        this.spawnCounter = 1;
        var center = canvasWidth/4.45;
        this.lanes = [center -= shift, center, center += shift];
    }
    else if(side == 'r')
    {
        this.spawnIndex = this.spawnLanes.length;
        this.spawnCounter = -1;
        var center = canvasWidth/1.38;
        this.lanes = [center -= shift, center, center += shift];
    }
    else
    {
        throw new Error("not a lane");
    }
}

RoadObjectSpawner.prototype = {
    spawnCounter: 0,
    _action: null,
    _frequency: 100,
    _frequencyCounter: 0,
    _lanes: 0,
    _lanesCounter: 0,
    roadObjects: [BlueCar, GreenTruck],
    currentObstacles: [],
    lanes: [], //x axis
    canvasHeight: 0, 
    canvasWidth: 0,
    playerCords: null,
    isCollision: false,
    isSpawn: false,
    spawnIndex: 0,
    spawnLanes: [],
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
        var obstacle_center  = 0;

        for(let obst = 0; obst < that.currentObstacles.length; obst++)
        {
            obstacle = that.currentObstacles[obst];
            obstacle.render();
            obstacle_center = obstacle.x + (obstacle.width/2);
            if((obstacle.y) >= that.playerCords.y && (obstacle_center) == (that.playerCords.x + (that.playerCords.width/2)))
            {
                console.log("collided");
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
        object.x = that.lanes[that.spawnLanes[that.spawnIndex]];
        if(that.side == 'l' && that.spawnIndex == that.spawnLanes.length)
        {
            that.spawnIndex = 0;
        }
        else if(that.side == 'r' && that.spawnIndex == 0)
        {
            that.spawnIndex = that.spawnLanes.length;
        }
        that.spawnIndex += that.spawnCounter;

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