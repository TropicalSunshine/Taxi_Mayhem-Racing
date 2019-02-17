var jumpcooldown = false;
var jumptimer = 0;
var cooldown_decrement = 0;

function Taxi(side){
    //players of the game
    this.pos = 1;
    this.SHIFT = 150;
    this.isJump = false;

    if(side == 'l'){
        this.y = height - 200;
        this.x = 450 - 37;
    }
    else{
        this.y = height - 200;
        this.x = 1350 - 37;
    }
    
    this.img = loadImage('taxi.png');

    this.show = function(){
        image(this.img, this.x, this.y, 74, 144);
    }

    this.left = function(){
        if(this.pos != 0){
            this.x -= this.SHIFT;
            this.pos -= 1;
        }
    }

    this.right = function(){
        if(this.pos != 2){
            this.x += this.SHIFT;
            this.pos += 1;
        }
    }

    this.updateJumpStatus = function()
    {
        if(jumptimer > 0)
        {
            jumptimer -= .01;
        }
        
        //if just went from aerial to landing
        if(jumptimer <= 0 && this.isJump == true)
        {
            this.isJump = false;

            jumpcooldown = true;
            cooldown_decrement = 1;
        }

        if(jumpcooldown == true)
        {
            cooldown_decrement -= .01;
            if(cooldown_decrement <= 0)
            {
                jumpcooldown = false;
            }
        }
    }

    this.jump = function()
    {
        if(this.isJump == false && jumpcooldown == false)
        {
            this.isJump = true;
            jumptimer = 1;
        }
    }
}

var ObstacleSpeedBoost = 0;
var ObsCount = 0;

function RoadObj(side){
    ObsCount++;

    if (side == 'l'){
        var lane = [263,413,563];
    }
    else{
        var lane = [1163,1313,1463];
    }
    
    var vehicles = ['image/roadobj1.png','image/roadobj2.png'];
    var speeds = [2,3,4,5,6];
    this.y = -150;
    this.x = lane[Math.floor(Math.random() * lane.length)];
    this.speed = speeds[Math.floor(Math.random() * lane.length)];
    this.img = loadImage(vehicles[Math.floor(Math.random() * vehicles.length)]);
    this.show = function(){
        image(this.img,this.x,this.y, 74, 144);
    }

    this.update = function(){
        if(ObsCount%10 == 0 && ObsCount != 0)
        {
            ObstacleSpeedBoost += .01;
        }
        this.y += 5 + ObstacleSpeedBoost;
    }

}   