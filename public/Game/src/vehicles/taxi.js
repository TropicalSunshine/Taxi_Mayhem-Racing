import {getImage} from "../asset.js";

/*
side can either be:
 'l' for left
 'r' for right
*/

export default function Taxi(side, canvas, canvasWidth, canvasHeight)
{
    this._side = side;
    this._canvas = canvas;
    this._img = getImage("taxi.png");
    this._canvasWidth = canvasWidth;
    this._canvasHeight = canvasHeight;

    this._laneChangeLength = canvasWidth/11.5;

    if(side == 'l')
    {
        this.x = canvasWidth/4.45;
        this.y = canvasHeight - 220;
    
        this.height = canvasHeight/6;
        this.width = canvasWidth/20;
    }
    else if(side == 'r')
    {
        this.x = canvasWidth/1.38;
        this.y = canvasHeight - 220;
    
        this.height = canvasHeight/6;
        this.width = canvasWidth/20;
    }
}

Taxi.prototype = {
    _width: 0,
    _height: 0,
    _canvas: null,
    _canvasHeight:0,
    _canvasWidth: 0,
    _hidden: false,
    _health: 3,
    _lane: 1,
    x: null,
    y: null,
    _img: null,
    _side: null,
    _laneChangeLength: 0,
    _carRatio: 1,
    _isJump: false,
    _jumpTimer: 0,
    _jumpCoolDown: false,
    _coolDownDecrement: 0,
    render: function()
    {
        var that = this;
        if(this._hidden) return null;

        if(that._isJump) this._updateJumpStatus();
        this._canvas.drawImage(
            this._img, this.x, this.y, 
            this.width * this._carRatio, this.height * this._carRatio
        );
    },
    left: function()
    {
        if(this._lane != 0)
        {
            this.x -= this._laneChangeLength;
            this._lane -= 1;
        }
    },
    right: function()
    {
        if(this._lane != 2)
        {
            this.x += this._laneChangeLength;
            this._lane += 1;
        }
    },
    jump: function()
    {
        var that = this;
        if(that._isJump == false && that._jumpCoolDown == false)
        {
            console.log("jump");
            that._isJump = true;
            that._jumpTimer = 1;
        }
    },
    hidden: function()
    {
        this._hidden = !this._hidden;
    },
    getCordinates: function()
    {
        var that = this;
        return {
            x: that.x,
            y: that.y
        }
    },
    _updateJumpStatus: function()
    {
        console.log("taxi is jumping");
        if(this._jumpTimer > 0)
        {
            this._jumpTimer -= .01; //CHANGEABLE----

            if(this._jumpTimer > .5)
            {
                this._carRatio += .02;
                this.x -= 1;
            }
            if(this._jumpTimer < .5)
            {
                this._carRatio -= .02;
                this.x += 1;
            }
        }
        
        //if just went from aerial to landing
        if(this._jumpTimer <= 0 && this._isJump == true)
        {
            this._isJump = false;

            this._jumpCoolDown = true;
            this._coolDownDecrement = 1;

            this._carRatio = 1;
        }

        if(this._jumpCoolDown == true)
        {
            this._coolDownDecrement -= .01;
            if(this._coolDownDecrement <= 0)
            {
                this._jumpCoolDown = false;
            }
        }
    }
}