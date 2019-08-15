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
    
    this.img = loadImage('images/taxi.png');

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
}

function RoadObj(){
    var lane = [263,413,563];
    var vehicles = ['images/roadobj1.png','images/roadobj2.png'];
    var speeds = [2,3,4,5,6];
    this.y = -150;
    this.x = lane[Math.floor(Math.random() * lane.length)];
    this.speed = speeds[Math.floor(Math.random() * lane.length)];
    this.img = loadImage(vehicles[Math.floor(Math.random() * vehicles.length)]);
    this.show = function(){
        image(this.img,this.x,this.y, 74, 144);
    }

    this.update = function(){
        this.y += 5;
    }

}   

module.exports = {
    Taxi: Taxi,
    RoadObj: RoadObj
}