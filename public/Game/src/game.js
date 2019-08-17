import {getImage} from "./asset.js";
import Taxi from "./vehicles/taxi.js";
import "./main.css";

export default function game(canvas, width, height)
{
    this._canvas = canvas;
    this._canvasWidth = width;
    this._canvasHeight = height;
    
    for(var i = 1; i < 5; i++)
    {
        this._background[`b${i}`] = getImage("roads.png");
    }
    this._Ltaxi = new Taxi('l', canvas, width, height);
    this._Rtaxi = new Taxi('r', canvas, width, height);
}

game.prototype = {
    _canvasWidth: 0,
    _canvasHeight: 0,
    _canvas: null,
    _gamestate: null,
    _isJump: false,
    _backgroundVelocity: 8,
    _backgroundOneY: 0,
    _backgroundTwoY: -900,
    _speedCounter: 0,
    _background: {
        b1: null,
        b2: null,
        b3: null, 
        b4: null
    },
    _Ltaxi: null,
    _Rtaxi: null,
    _rObstacles: [],
    _lObstacles: [],
    _renderBackground: function(){
        var that = this;
        
        this._canvas.drawImage(that._background.b1, 0, this._backgroundOneY, that._canvasWidth/2, that._canvasHeight);
        this._canvas.drawImage(that._background.b2, that._canvasWidth/2, this._backgroundOneY,  that._canvasWidth/2, that._canvasHeight);
        this._canvas.drawImage(that._background.b3, 0, this._backgroundTwoY,  that._canvasWidth/2, that._canvasHeight);
        this._canvas.drawImage(that._background.b4, that._canvasWidth/2, this._backgroundTwoY,  that._canvasWidth/2, that._canvasHeight);
    },
    _renderTaxis: function()
    {
        this._Ltaxi.render();
        this._Ltaxi.jump();
        this._Rtaxi.render();
    },
    render: function()
    {
        var that = this;

        this._updateBackground();
        this._renderBackground();
        this._renderTaxis();
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
    }, 
    startGame: function()
    {

    }, 
    restartGame: function()
    {

    }
}
