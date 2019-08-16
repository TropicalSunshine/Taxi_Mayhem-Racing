import ROADS from "./images/roads.png";

export default function game(p5)
{
    this.p5 = p5;
    this._renderBackground();
}

game.prototype = {
    p5: null,
    _gamestate: "null",
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

        var backgroundCount = 1;
        for(var i = 1; i < 5; i++)
        {
            that._background[`b${i}`] = that.p5.loadImage(ROADS);
        }

        console.log(that._background);
        this.p5.image(that._background.b1, 0, this._backgroundOneY);
        this.p5.image(that._background.b2, 900, this._backgroundOneY);
        this.p5.image(that._background.b3, 0, this._backgroundTwoY);
        this.p5.image(that._background.b4, 900, this._backgroundTwoY);
        
    },
    render: function()
    {
        var that = this;

        this._updateBackground();
        this.p5.image(background.b1, 0, this._backgroundOneY);
        this.p5.image(background.b2, 900, this._backgroundOneY);
        this.p5.image(background.b3, 0, this._backgroundTwoY);
        this.p5.image(background.b4, 900, this._backgroundTwoY);
    },
    _updateBackground: function()
    {
        this._backgroundOneY += BGV;
        this._backgroundTwoY += BGV;
    
        if(this._backgroundOneY >= height){
            this._backgroundOneY = -900;
        }
    
        if(this._backgroundTwoY >= height){
            this._backgroundTwoY = -900;
            this._speedCounter++;
        }
    
        if(this._speedCounter%( Math.floor( (this._regulator**2) ) + 5) == 0 && LoopCycles != 0)
        {
            BGV += 7;
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
