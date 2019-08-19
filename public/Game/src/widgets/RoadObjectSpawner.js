import {getWidth, getHeight} from "../global.js";



function RoadObjectSpawner(side)
{

}

RoadObjectSpawner.prototype = {
    _frequency: 0,
    _frequencyCounter: 0,
    roadObjects: [],
    render: function()
    {
        var that = this;
        this._frequencyCounter++;
        if(that._freqCounter == that._frequency)
        {
            //render
            that._frequencyCounter = 0;
        }
    }
}