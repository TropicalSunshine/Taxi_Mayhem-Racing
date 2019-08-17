import {getImage} from "../asset.js";

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
    this._heartOne.img = getImage("heart.png");
    this._heartTwo.img = getImage("heart.png");
    this._heartThree.img = getImage("heart.png");
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
    _heartOne: {
        state: true,
        img: null
    },
    _heartTwo: {
        state: true,
        img: null
    },
    _heartThree: {
        state: true,
        img: null
    },
    render: function()
    {
        var that = this;

        if(that._side == 'l')
        {
            this.canvas.drawImage(that._heartOne.img, this.x, this.y,this.width, this.height)
            this.canvas.drawImage(that._heartOne.img, this.x, this.y - 150,this.width, this.height)
            this.canvas.drawImage(that._heartOne.img, this.x, this.y - 300,this.width, this.height)
        }
        else if(that._side == 'r')
        {
            this.canvas.drawImage(that._heartOne.img, this.x, this.y,this.width, this.height)
            this.canvas.drawImage(that._heartOne.img, this.x, this.y - 150,this.width, this.height)
            this.canvas.drawImage(that._heartOne.img, this.x, this.y - 300,this.width, this.height)
        }
    },
    deduct: function()
    {
        
    },
    add: function()
    {

    }
}