import {getImage} from "../asset.js";
import { timingSafeEqual } from "crypto";

export default function HealthBar(side, canvas, canvasWidth, canvasHeight)
{
    this._side = side;
    this.canvas = canvas;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    if(side == 'l')
    {
        this.height = canvasWidth/16;
        this.width = canvasWidth/16;
        this.x = this.width - 100;
    }
    else if(side == 'r')
    {
        this.height = canvasWidth/16;
        this.width = canvasWidth/16;
        this.x = canvasWidth/1.087;
    }


    this.y = canvasHeight - (canvasWidth/16); 
    if(side == 'l')
    {
        //solution to this.heart img's getting replaced across all instances
        this.Lhearts[0].img = getImage("heart.png");
        this.Lhearts[1].img = getImage("heart.png");
        this.Lhearts[2].img = getImage("heart.png");
    }
    else if(side == 'r')
    {
        this.Rhearts[0].img = getImage("heart.png");
        this.Rhearts[1].img = getImage("heart.png");
        this.Rhearts[2].img = getImage("heart.png");
    }
}

HealthBar.prototype = {
    _side: null,
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    canvas: null,
    _canvasWidth: 0,
    _canvasHeight: 0,
    _health: 3,
    Lhearts: [
        {
            state: true,
            img: null
        },
        {
            state: true,
            img: null
        },
        {
            state: true,
            img: null
        },
    ],
    Rhearts: [
        {
            state: true,
            img: null
        },
        {
            state: true,
            img: null
        },
        {
            state: true,
            img: null
        },
    ],
    render: function()
    {
        var that = this;
        
        if(that._side == 'l')
        {
            this.canvas.drawImage(that.Lhearts[0].img, this.x, this.y,this.width, this.height)
            this.canvas.drawImage(that.Lhearts[1].img, this.x, this.y - 150,this.width, this.height)
            this.canvas.drawImage(that.Lhearts[2].img, this.x, this.y - 300,this.width, this.height)
        }
        else if(that._side == 'r')
        {
            this.canvas.drawImage(that.Rhearts[0].img, this.x, this.y,this.width, this.height)
            this.canvas.drawImage(that.Rhearts[1].img, this.x, this.y - 150,this.width, this.height)
            this.canvas.drawImage(that.Rhearts[2].img, this.x, this.y - 300,this.width, this.height)
        }
    },
    deduct: function()
    {
        var that = this;
        if(this._health != 0)
        {
            if(this._side == 'l')
            {
                this.Lhearts[this._health - 1].img = getImage("heart_empty.png");
            }
            else if(this._side == 'r')
            {
                this.Rhearts[this._health - 1].img = getImage("heart_empty.png");    
            }
            this._health -= 1;
        }
    },
    add: function()
    {
        if(this._health != 3)
        {
            if(this._side == 'l')
            {
                this.Lhearts[this._health].img = getImage("heart.png");
            }
            else if(this._side == 'r')
            {
                this.Rhearts[this._health].img = getImage("heart.png");    
            }
            this._health += 1;
        }
    },
    reset: function()
    {
        this._health = 3;
        if(this._side == 'l')
        {
            this.Lhearts[0].img = getImage("heart.png");
            this.Lhearts[1].img = getImage("heart.png");
            this.Lhearts[2].img = getImage("heart.png");
        }
        else if(this._side == 'r')
        {
            this.Rhearts[0].img = getImage("heart.png");
            this.Rhearts[1].img = getImage("heart.png");
            this.Rhearts[2].img = getImage("heart.png");
        }
    }
}