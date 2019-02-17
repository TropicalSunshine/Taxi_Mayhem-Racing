


//http requests for data 
var xhttp = new XMLHttpRequest;
var url = "http://169.234.103.32:2498/data";
var IDs = [];
setInterval(() =>{
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            controllerdata = JSON.parse(xhttp.response);
            console.log(controllerdata);
            for(let i = 0; i<controllerdata.length; i++){
                if(!IDs.includes(controllerdata[i].unique)){
                    IDs.push(controllerdata[i].unique);
                    keyPressed(controllerdata[i]);
                }
            }
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
        EndGame(taxi);
    }
}




var lobstacles = [];
var robstacles = []
var delObstacles = [];

function setup() {
    createCanvas(1800,900);
    taxi1 = new Taxi('l');
    taxi2 = new Taxi('r');
    robstacles.push(new RoadObj('r'));
    lobstacles.push(new RoadObj('l'));
    // Create both of your off-screen graphics buffers
}

function draw() {
    // Draw on your buffers however you like
    Bg(); 
    taxi1.show();
    taxi2.show();
    displayObjt(robstacles,"r");
    displayObjt(lobstacles,"l");
}

function displayObjt(obstacles,side){
    for(let i = 0; i < obstacles.length; i++){
        obstacles[i].show();
        obstacles[i].update();
        checkCollision(obstacles[i], taxi1);
        checkCollision(obstacles[i], taxi2);

        if(obstacles[i].y >= 900){
            delObstacles.push(i);
        }
    }

    for( let i = 0; i<delObstacles.length;i++){
        delete obstacles[delObstacles[i]];
        obstacles.splice(delObstacles[i],1);
    }

    delObstacles = [];

    if (frameCount % 75 == 0) {
        obstacles.push(new RoadObj(side));
    }
}

function keyPressed(controls){
    console.log(controls.DATA);
    if(controls.ID == 0){
        if (controls.DATA == 'l'){
            console.log("move left");
            controls.DATA = '';
            taxi1.left();
        }
        else if(controls.DATA == 'r'){
            console.log("move right");
            controls.DATA = '';
            taxi1.right();
        }
    }
    if (controls.ID == 1){
        if (controls.DATA == 'l'){
            controls.DATA = '';
            taxi2.left();
        }
        else if(controls.DATA == 'r'){
            controls.DATA = '';
            taxi2.right();
        }
    }
}

function EndGame(taxi){
}
