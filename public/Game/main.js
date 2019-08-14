

var socket = io.connect(hostURL, {
    path: "/controllerIO"
})

console.log("joining room");
console.log(localStorage.gameID);
socket.emit("join room client", {
    ID: localStorage.gameID
})

socket.on("player 1 controls", function(data){
    console.log("player 1");
    console.log(data);
    var control = {
        ID: 1,
        DATA: data
    }
    keyPressed(control);
})

socket.on("player 2 controls", function(data){
    console.log("player 2");
    console.log(data);
    var control = {
        ID: 2,
        DATA: data
    }
    keyPressed(control);
})

//background image
//stiched to the connecting one
var BACKHEIGHT = -130;
var BGY1 = 0;
var BGY2 = -900;
var BGV = 8;

var LoopCycles = 0;
var regulator = 0;


var gamestate = "_";



function start()
{
    gamestate = 'start';
}

function Bg(){

    loadImage('images/roads.png', function(bg){
        image(bg,0,BGY1);
    });

    loadImage('images/roads.png', function(bg){
        image(bg,900,BGY1);
    });

    loadImage('images/roads.png', function(bg){
        image(bg,0,BGY2);
    });

    loadImage('images/roads.png', function(bg){
        image(bg,900,BGY2);
    });
    
    BGY1 += BGV;
    BGY2 += BGV;

    if(BGY1 >= height){
        BGY1 = -900;
    }

    if(BGY2 >= height){
        BGY2 = -900;
        LoopCycles++;
    }

    if(LoopCycles%( Math.floor( (regulator**2) ) + 5) == 0 && LoopCycles != 0)
    {
        BGV += 7;
        LoopCycles = 0;
        regulator++;
    }
}

function checkCollision(obj, taxi, orientation){
    if((obj.y + 144) >= taxi.y && obj.x == taxi.x){

        if ( !taxi.register_crash() )
        {
            
            if(orientation == 'l')
            {
                gamestate = 'l';
            }
            else
            {
                if(orientation == 'r')
                {
                    console.log(gamestate);
                    gamestate = 'r';
                }
            }
        }
        else
        {
            console.log("GAME IS NOT OVER, STILL HP:", taxi.HP);
        }
    }

}




var lobstacles = [];
var robstacles = [];

var delObstacles = [];
var objcount = 0;

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

    if(gamestate == 'start')
    {
        displayObjt(robstacles,"r");
        displayObjt(lobstacles,"l");
    }

    taxi1.show();

    fill("red");
    rect(800, 625, 55, 250);
    fill("yellow")
    rect(800, (120-taxi1.HP)/120 * 250 + 625, 55, 250 - (120-taxi1.HP)/120 * 250 )

    taxi2.show();
    
    fill("red");
    rect(950, 625, 55, 250);
    fill("yellow")
    rect(950, (120-taxi2.HP)/120 * 250 + 625, 55, 250 - (120-taxi2.HP)/120 * 250 )

    if (gamestate != '_'){
        endgame();
        robstacles = [];
        lobstacles = [];
    }
}

function displayObjt(obstacles, side)
{
    for(let i = 0; i < obstacles.length; i++){
        obstacles[i].show();
        obstacles[i].update();

        if(taxi1.isJump == false)
        {
            checkCollision(obstacles[i], taxi1, 'l');
        }

        if(taxi2.isJump == false)
        {
            checkCollision(obstacles[i], taxi2, 'r');
        }

        if(obstacles[i].y >= 900){
            delObstacles.push( obstacles[i] );
        }
    }

    var cleaningIndex = 0;

    for( let i = 0; i<delObstacles.length;i++)
    {
        cleaningIndex = obstacles.indexOf(delObstacles[i] );
        delete obstacles[ cleaningIndex ];
        obstacles.splice(cleaningIndex, 1);
    }

    delObstacles = [];

    if (frameCount %(110) == 0 || frameCount%( 30 + Math.floor( 1400/objcount ) ) == 0) {
        obstacles.push(new RoadObj(side) );
        objcount++;
    }

    if (frameCount % 200 == 0){
        obstacles.push(new Semi(side));
        objcount++;
    }

    taxi1.updateJumpStatus();
    taxi2.updateJumpStatus();
}

function keyPressed(controls){

    if(controls.ID == 1){
        if (controls.DATA == 'l'){
            controls.DATA = '';
            taxi1.left();
        }
        else if(controls.DATA == 'r'){
            
            controls.DATA = '';
            taxi1.right();
        }
        else if(controls.DATA == 'u'){
            controls.DATA = "";
            taxi1.jump();
        }
    }
    
    if (controls.ID == 2){
        //move left
        if (controls.DATA == 'l'){
            controls.DATA = '';
            taxi2.left();
        }
        //move right
        else if(controls.DATA == 'r'){
            controls.DATA = '';
            taxi2.right();
        }
        //jump
        else if(controls.DATA == 'u'){
            controls.DATA = "";
            taxi2.jump();
        }
    }
}

function endgame(img){
    textSize(70);
    textStyle(BOLD);
    fill(53, 24, 242);

    taunts = [" DRIVES BETTER THAN YOU"]
    text('              GAME OVER\nPLAYER ' + String( (Number(gamestate == 'r') + 1)%2 + 1 ) + taunts[0], width/2 - 825 + 250, height/2-225);
}