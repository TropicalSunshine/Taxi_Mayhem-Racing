


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


function checkCollision(obj,taxi){
    if((obj.y + 144) >= taxi1.y && obj.x == taxi1.x){
        console.log("crash");
    }

}




var obstacles = [];
var delObstacles = [];
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
        console.log("Showing index", i);
        obstacles[i].show();
        console.log("Finished Showing", i);

        obstacles[i].update();
        checkCollision(obstacles[i], taxi1);
        checkCollision(obstacles[i], taxi2);

        if(obstacles[i].y >= 900){
            delObstacles.push(i);
        }
    }

    for( let i = 0; i<delObstacles.length;i++){
        delete obstacles[delObstacles[i] ];
        obstacles.splice(delObstacles[i],1);
    }

    delObstacles = [];

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
