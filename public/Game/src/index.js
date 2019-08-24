import "./main.css";
import Game from "./game.js";
import {connect, socket, startGame, restartGame} from "./network.js";
import { downloadImages, downloadAudios } from "./asset.js";
import {setHeight, setWidth, setCanvas} from "./global.js";

export var menu = document.getElementById("menu");


let renderInterval = null;
let GAME = null;
let LANES;

console.log("http://" + window.location.host);
console.log(localStorage.gameID);


window.onload = function()
{
    var restart_button = document.getElementById("restart_button");
    var start_button = document.getElementById("start_button");
    start_button.onclick = function()
    {
       start(); 
    }
    restart_button.onclick = function()
    {
        reset();
    }
}


const start = () =>
{
    startGame();
    GAME.startGame();
    start_button.classList.add("hidden");
    restart_button.classList.remove("hidden");
    menu.classList.add("hidden");
}

const reset = () => {
    restartGame();
    GAME.reset();
    menu.classList.add("hidden");
}



Promise.all([
    connect(),
    downloadImages(),
    downloadAudios()
]).then(() => {
    var ctx = document.getElementById("game-canvas");
    const canvas = ctx.getContext("2d");

    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    ctx.width = scaleRatio * window.innerWidth;
    ctx.height = scaleRatio * window.innerHeight;

    setCanvas(canvas);
    setHeight(ctx.height);
    setWidth(ctx.width);

    GAME = new Game(LANES);

    startRendering();

    function render()
    {
        GAME.render(); 
    }

    function startRendering()
    {
        renderInterval = setInterval(render, 1000/60);
    }

    function stopRendering()
    {
        clearInterval(renderInterval);
    }
})

socket.on("player 1 controls", function(data){
    console.log("player 1");
    console.log(data);
    var control = {
        ID: 1,
        DATA: data
    }
    GAME.takeInput(control);
})

socket.on("player 2 controls", function(data){
    console.log("player 2");
    console.log(data);
    var control = {
        ID: 2,
        DATA: data
    }
    GAME.takeInput(control);
})

socket.on("start game", function(){
    start();
})

socket.on("restart game", function(){
    reset();
})

socket.on("join room client", function(data){
    LANES = data.lanes;
})


/*
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



let sketch = function(sk)
{
    sk.setup = function(){
        sk.createCanvas(1800,900);
        var GAME = new game(sk);

        
        taxi1 = new Taxi('l');
        taxi2 = new Taxi('r');
        robstacles.push(new RoadObj('r'));
        lobstacles.push(new RoadObj('l'));
    
    
    sk.draw = function(){
            // Draw on your buffers however you like


            /*
            console.log("hello");
            console.log(bg1, bg2, bg3, bg4);
            Bg(bg1, bg2, bg3, bg4); 
            if(gamestate == 'start')
            {
                displayObjt(robstacles,"r");
                displayObjt(lobstacles,"l");
            }
        
            taxi1.show();
        

            //health bars;
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


        function Bg(a,b,c,d){
            console.log(a);
            sk.image(a,0,BGY1);
            sk.image(b,900,BGY1);
            sk.image(c,0,BGY2);
            sk.image(d,900,BGY2);
        
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
        // Create both of your off-screen graphics buffers
    }
}

const p = new p5(sketch);


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

*/