<<<<<<< HEAD
<<<<<<< HEAD:public/Game/src/main.js
<<<<<<< HEAD:public/Game/src/main.js
=======
>>>>>>> parent of fbd6ecf... up to date
import {RoadObj, Taxi} from "./vehicles.js";
import {hostURL} from "./hostURL.js";
import io from "socket.io-client";
import * as p5 from "./p5.js";
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 183504a... changed to local port forwarded ip:public/Game/main.js

//http requests for data 
/*
var xhttp = new XMLHttpRequest;

var url = "http://localhost:4293/controlIO/client/123"
var IDs = [];
setInterval(() =>{
    var prevData = {
        ID : null,
        DATA: null
    };
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            controllerdata = JSON.parse(xhttp.response);
            data = {
                ID: 0, 
                DATA: controllerdata.player1
            };
            if(data.DATA != prevData.DATA)
            {
                console.log(prevData);
                console.log(controllerdata);
                keyPressed(data);
            }
            prevData = data;
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}, 1000/100);
*/
<<<<<<< HEAD:public/Game/src/main.js
>>>>>>> parent of 183504a... changed to local port forwarded ip:public/Game/main.js
=======
>>>>>>> parent of 183504a... changed to local port forwarded ip:public/Game/main.js
=======
>>>>>>> parent of fbd6ecf... up to date

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
var BGV = 8; //background velocity

var LoopCycles = 0;
var regulator = 0;


var gamestate = "_";



function start()
{
    gamestate = 'start';
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

var bg1, bg2, bg3, bg4;
function preLoadImg()
{
    loadImage('images/roads.png', function(bg){
        console.log(bg);
        bg1 = bg; 
        console.log(bg1);
    });

    loadImage('images/roads.png', function(bg){
        bg2 = bg;
    });

    loadImage('images/roads.png', function(bg){
        bg3 = bg;
    });

    loadImage('images/roads.png', function(bg){
        bg4 = bg;
    });
}


let s = function(sk)
{

    sk.setup = function(){
        sk.createCanvas(1800,900);
        console.log("goodbye");
        preLoadImg();
        taxi1 = new Taxi('l');
        taxi2 = new Taxi('r');
        robstacles.push(new RoadObj('r'));
        lobstacles.push(new RoadObj('l'));
    
    sk.draw = function(){
            // Draw on your buffers however you like
            console.log("hello");
            console.log(bg1, bg2, bg3, bg4);
            Bg(bg1, bg2, bg3, bg4); 
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
        // Create both of your off-screen graphics buffers
    }
}




function Bg(a,b,c,d){
    console.log(a);
    image(a,0,BGY1);
    image(b,0,BGY1);
    image(c,0,BGY1);
    image(d,0,BGY1);

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
        BGV += 1;
        LoopCycles = 0;
        regulator++;
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