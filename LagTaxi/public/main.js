


//http requests for data 
var xhttp = new XMLHttpRequest;
var url = "http://169.234.103.32:2498/data";
setInterval(() =>{
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            console.log(xhttp.response);
            controllerdata = xhttp.response;
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}, 1000);






function Lane(x){
    this.y = 0;
    this.x = x;

    this.drop = 5;
    this.velocity = 0;

    this.show = function () {
        fill(255);
        rect(this.x, this.y - 800,20,90)
        rect(this.x, this.y - 600,20,90)
        rect(this.x, this.y - 400,20,90)
        rect(this.x, this.y - 200,20,90)
        rect(this.x, this.y, 20,90);
        rect(this.x, this.y + 200,20,90)
        rect(this.x, this.y + 400,20,90)
        rect(this.x, this.y + 600,20,90)
        rect(this.x, this.y + 800,20,90)
        rect(this.x, this.y + 1000,20,90)
    }

    this.update = function(){
        this.velocity += this.drop;
        this.y += this.drop;
        if (this.y >= height){
            this.y = 0;
        }
    }


}


//background image
//stiched to the connecting one
var BACKHEIGHT = -130;
var BGY1 = 0;
var BGY2 = -900;
var BGV = 0;
function Bg(){
    loadImage('roads.png', function(bg){
        image(bg,0,BGY1);
    }); 

    loadImage('roads.png', function(bg){
        image(bg,900,BGY1);
    });

    loadImage('roads.png', function(bg){
        image(bg,0,BGY2);
    });

    loadImage('roads.png', function(bg){
        image(bg,900,BGY2);
    });
    
    BGY1 += 8;
    BGY2 += 8;

    if(BGY1 >= height){
        BGY1 = -900;
    }

    if(BGY2 >= height){
        BGY2 = -900;
    }
}

/*
function checkCollision(obj,taxi){
    if((obj.y + 144) >= taxi1.y && obj.x == taxi1.x){
        console.log("crash");
    }

}*/


var obstacles = [];

function setup() {
    createCanvas(1800,900);
    taxi1 = new Taxi('l');
    taxi2 = new Taxi('r');
    obstacles.push(new RoadObj())
    // Create both of your off-screen graphics buffers
}

function draw() {
    // Draw on your buffers however you like
    Bg(); 
    taxi1.show();
    taxi2.show();
    keyPressed();

    for(let i = 0; i < obstacles.length; i++){
        obstacles[i].show();
        obstacles[i].update();
    }

    if (frameCount % 75 == 0) {
        obstacles.push(new RoadObj());
    }
    //checkCollision();
}



function keyPressed(){
    if (keyCode === 37){
        taxi1.left();
        keyCode = 0;
    }
    else if(keyCode === 39){
        taxi1.right();
        keyCode = 0;
    }
}
