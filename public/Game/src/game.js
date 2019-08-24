import {getImage} from "./asset.js";
import {getHeight, getWidth, getCanvas} from "./global.js";
import Taxi from "./vehicles/taxi.js";
import RoadObjectSpawner from "./widgets/RoadObjectSpawner.js";

import {menu} from "./index.js";

import "./main.css";


var restartButton = document.getElementsByClassName("restart_button")[0];


export default function Game(lanes)
{
    var that = this;
    this._canvas = getCanvas();
    this._canvasWidth = getWidth;
    this._canvasHeight = getHeight;


    this._backgroundTwoY = getHeight();
    
    for(var i = 1; i < 5; i++)
    {
        this._background[`b${i}`] = getImage("roads.png");
    }
    
    this._Ltaxi = new Taxi('l', getCanvas(), this._canvasWidth(), this._canvasHeight());
    this._Rtaxi = new Taxi('r', getCanvas(), this._canvasWidth(), this._canvasHeight());

    this._rObstSpawner = new RoadObjectSpawner('r');
    this._lObstSpawner = new RoadObjectSpawner('l');
}

Game.prototype = {
    _canvasWidth: null,
    _canvasHeight: null,
    _canvas: null,
    gamestate: false,
    winner: null, 
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
        this._Ltaxi.jump();
        this._Rtaxi.render();
    },
    _renderObstacles: function()
    {
        if (this._rObstSpawner.isSpawn == false && this.gamestate) this._rObstSpawner.start(), this._lObstSpawner.start();

        this._rObstSpawner.render();
        this._lObstSpawner.render();
    },
    render: function()
    {
        var that = this;

        this._updateBackground();
        this._renderBackground();
   
        this._renderObstacles();
        this._checkCollision();

        this._renderTaxis();

        if(this.winner != "")
        {
            this.endGame();
        }
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
        console.log(!this._Ltaxi.isInvincible, resultL);
        (resultL && !this._Ltaxi.isInvincible) ? this._Ltaxi.takeDamage(): null;
        (resultR && !this._Rtaxi.isInvincible) ? this._Rtaxi.takeDamage(): null;

        if(this._Ltaxi.health == 0)
        {
            this.gamestate = false;
            this.winner = 'l';
        }
        else if(this._Rtaxi.health == 0)
        {
            this.gamestate = false;
            this.winner = 'r';
        }

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
        console.log("starting game");
        this.gamestate = true;
        this.winner =  "";
    }, 
    reset: function()
    {
        console.log("restarting game");
        this.winner = "";
        this._Ltaxi.reset();
        this._Rtaxi.reset();
        this.gamestate = true;
    },
    endGame: function()
    {
        this._rObstSpawner.stop();
        this._lObstSpawner.stop();
        this.gamestate = false;
        menu.classList.remove("hidden");
    }
}
