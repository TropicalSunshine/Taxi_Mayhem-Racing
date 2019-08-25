import {getImage} from "../asset.js";
import HealthBar from "../widgets/healthbar.js";

/*
side can either be:
 'l' for left
 'r' for right
*/

export default function Taxi(side, canvas, canvasWidth, canvasHeight)
{

    var that = this;
    this._side = side;
    this._canvas = canvas;
    this._img = getImage("taxi.png");
    this._carDamageStage = [];
    this._canvasWidth = canvasWidth;
    this._canvasHeight = canvasHeight;
    this._healthBar = new HealthBar(side, canvas, canvasWidth, canvasHeight);
    this._laneChangeLength = canvasWidth/11.5;

    this._carDamageStage.push(getImage("taxi_fourth.png"));
    this._carDamageStage.push(getImage("taxi_third.png"));
    this._carDamageStage.push(getImage("taxi_second.png"));
    this._carDamageStage.push(getImage("taxi.png"));

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
    else
    {
        throw new Error("not a lane");
    }
}

Taxi.prototype = {
    _width: 0,
    _height: 0,
    _canvas: null,
    _canvasHeight:0,
    _canvasWidth: 0,
    _hidden: false,
    health: 3,
    _healthBar: null,
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
    _carDamageStage: [],
    isInvincible: false,
    render: function()
    {
        var that = this;
        this._renderHealthBar();
        this._updateJumpStatus();

        if(this._hidden) return null;

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
            that.isInvincible = true;
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
            y: that.y,
            height: that.height,
            width: that.width
        }
    },
    isCrashed: function()
    {
        return this.health == 0;
    },
    takeDamage: function()
    {
        if(this.isInvincible == false)
       { 
           
            var that = this;
            if(this.health != 0) {
                this.health -= 1;
                this._img = this._carDamageStage[that.health]
            };
            this._healthBar.deduct();
            this.isInvincible = true;
            //turn on blink
            var blinkCounter = 0;
            var blinkInterval;
            var blink = () => {
                if(blinkCounter == 200)
                {
                    that._hidden = true;
                    clearInterval(blinkInterval);
                    that.isInvincible = false;
                }
                that._hidden = !that._hidden;
                blinkCounter++;
            }

            blinkInterval = setInterval(blink,1000/100) 
        }
    },
    reset: function()
    {
        this.health = 3;
        this._img = this._carDamageStage[3];
        this.isInvincible = false;
        this._healthBar.reset();
    },
    _updateJumpStatus: function()
    {
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
            this.x -= 2; //fixes invisbility bug where after car jumps then becomes permanantly invisible
            this._isJump = false;
            this.isInvincible = false;

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
    },
    _renderHealthBar: function()
    {
        this._healthBar.render();
    }
}