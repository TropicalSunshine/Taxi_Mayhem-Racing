
import ROADS from "./images/roads.png";

export default function game(canvas)
{
    this._canvas = canvas;
    this._renderBackground();
}

game.prototype = {
    _canvas: null,
    _gamestate: null,
    _backgroundVelocity: 8,
    _backgroundOneY: 0,
    _backgroundTwoY: -900,
    _speedCounter: 0,
    _regulator: 0,
    _background: {
        b1: null,
        b2: null,
        b3: null, 
        b4: null
    },
    _rObstacles: [],
    _lObstacles: [],
    _renderBackground: function(){
        var that = this;
        console.log("rendering background");
        var backgroundCount = 1;
        
        var bgImageHold;
        for(var i = 1; i < 5; i++)
        {
            bgImageHold = new Image();
            bgImageHold.src = ROADS;
            that._background[`b${i}`] = bgImageHold;
        }
        console.log(this._canvas.drawImage);
        this._canvas.drawImage(that._background.b1, 0, this._backgroundOneY);
        this._canvas.drawImage(that._background.b2, 900, this._backgroundOneY);
        this._canvas.drawImage(that._background.b3, 0, this._backgroundTwoY);
        this._canvas.drawImage(that._background.b4, 900, this._backgroundTwoY);
;
        
    },
    render: function()
    {
        var that = this;

        this._updateBackground();
        this._canvas.drawImage(that._background.b1, 0, this._backgroundOneY);
        this._canvas.drawImage(that._background.b2, 900, this._backgroundOneY);
        this._canvas.drawImage(that._background.b3, 0, this._backgroundTwoY);
        this._canvas.drawImage(that._background.b4, 900, this._backgroundTwoY);
    },
    _updateBackground: function()
    {
        var that = this;
        this._backgroundOneY += that._backgroundVelocity;
        this._backgroundTwoY += that._backgroundVelocity;
    
        if(this._backgroundOneY >= 900){
            this._backgroundOneY = -900;
        }
    
        if(this._backgroundTwoY >= 900){
            this._backgroundTwoY = -900;
            this._speedCounter++;
        }
    
        if(this._speedCounter%( Math.floor( (this._regulator**2) ) + 5) == 0 && this._speedCounter != 0)
        {
            this._backgroundVelocity += 7;
            this._speedCounter = 0;
            this._regulator++;
        }
    }, 
    startGame: function()
    {

    }, 
    restartGame: function()
    {

    }
}
