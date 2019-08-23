import {getImage} from "./asset.js";
import {getHeight, getWidth, getCanvas} from "./global.js";
import Taxi from "./vehicles/taxi.js";
import RoadObjectSpawner from "./widgets/RoadObjectSpawner.js";

import "./main.css";

export default function Game()
{
    var that = this;
    this._canvas = getCanvas();
    this._canvasWidth = getWidth;
    this._canvasHeight = getHeight;

    this.gamestate = false;


    this._backgroundTwoY = getHeight();
    
    for(var i = 1; i < 5; i++)
    {
        this._background[`b${i}`] = getImage("roads.png");
    }
    
    this._Ltaxi = new Taxi('l', getCanvas(), this._canvasWidth(), this._canvasHeight());
    this._Rtaxi = new Taxi('r', getCanvas(), this._canvasWidth(), this._canvasHeight());

    this._rObstSpawner = new RoadObjectSpawner('r', that._Rtaxi);
    this._lObstSpawner = new RoadObjectSpawner('l', that._Ltaxi);
}

Game.prototype = {
    _canvasWidth: null,
    _canvasHeight: null,
    _canvas: null,
    gamestate: null,
    _isJump: false,
    _backgroundVelocity: 8,
    _backgroundOneY: 0,
    _backgroundTwoY: 0,
    _speedCounter: 0,
    _background: {
        b1: null,
        b2: null,
        b3: null, 
        b4: null
    },
    _Ltaxi: null,
    _Rtaxi: null,
    _rObstSpawner: null,
    _lObstSpawner: null,
    _renderBackground: function(){
        var that = this;
        
        this._canvas.drawImage(that._background.b1, 0, this._backgroundOneY, that._canvasWidth()/2, that._canvasHeight());
        this._canvas.drawImage(that._background.b2, that._canvasWidth()/2, this._backgroundOneY,  that._canvasWidth()/2, that._canvasHeight());
        this._canvas.drawImage(that._background.b3, 0, this._backgroundTwoY,  that._canvasWidth()/2, that._canvasHeight());
        this._canvas.drawImage(that._background.b4, that._canvasWidth()/2, this._backgroundTwoY,  that._canvasWidth()/2, that._canvasHeight());
    },
    _renderTaxis: function()
    {
        this._Ltaxi.render();
        this._Rtaxi.render();
    },
    _renderObstacles: function()
    {
        this._rObstSpawner.render();
        this._lObstSpawner.render();
    },
    render: function()
    {
        var that = this;

        this._updateBackground();
        this._renderBackground();
        if(that.gamestate)
        {     
            this._renderObstacles();
            this._checkCollision();
        }
        this._renderTaxis();
    },
    _updateBackground: function()
    {
        var that = this;
        this._backgroundOneY += that._backgroundVelocity;
        this._backgroundTwoY += that._backgroundVelocity;
    
        if(this._backgroundOneY >= that._canvasHeight()){
            this._backgroundOneY = -that._canvasHeight();
        }
    
        if(this._backgroundTwoY >= that._canvasHeight()){
            this._backgroundTwoY = -that._canvasHeight();
        }
    }, 
    _checkCollision: function()
    {

        var resultL = this._lObstSpawner.checkCollision(this._Ltaxi.getCordinates());
        var resultR = this._rObstSpawner.checkCollision(this._Rtaxi.getCordinates());

        //check if invisible 
        (resultL && !this._Ltaxi.isInvincible) ? this._Ltaxi.takeDamage(): null;
        (resultR && !this._Rtaxi.isInvincible) ? this._Rtaxi.takeDamage(): null;

    },
    takeInput: function(ctrl)
    {
        if(ctrl.ID == 1)
        {

            if(ctrl.DATA == 'l')
            {
                this._Ltaxi.left()
            }
            else if(ctrl.DATA == 'r')
            {
                this._Ltaxi.right();
            }
            else if(ctrl.DATA == 'j')
            {
                this._Ltaxi.jump();
            }
        }
        else if(ctrl.ID == 2)
        {
            if(ctrl.DATA == 'l')
            {
                this._Rtaxi.left()
            }
            else if(ctrl.DATA == 'r')
            {
                this._Rtaxi.right();
            }
            else if(ctrl.DATA == 'j')
            {
                this._Rtaxi.jump();
            }
        }
    },
    startGame: function()
    {
        this.gamestate = true;
    }, 
    restartGame: function()
    {

    }
}
