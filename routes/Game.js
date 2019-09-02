const express = require("express");
const uniqid = require("uniqid");
const path = require("path");

const router = express.Router();

var GAMESESSIONS = {};

var RANDOM_LANES = [0,0,0,1,1,1,1,2,2,2,0,0,0,0,0,1,1,1,1,2,2,2];


function shuffle(array)
{
    var c = array;
    c.sort(() => Math.random() - 0.5);
    return c;
}


module.exports.controllerIO = function(io)
{

    io.on("connection", function(socket){

        //CLIENT socket cmds


        //starting the game through client
        socket.on("start game", function(data) {
            console.log("start game");
            socket.to("room-" + data.gameID).emit("start game", {
                data: null
            })
        })

        socket.on("join room client", function(data){
            console.log("joining room from client " + data.ID);
            socket.join("room-" + data.ID);
        })


        //MOBILE socket cmds
        //listening for sockets to join rooms
        socket.on("join room mobile", function(data){
            var gameID = data.ID;

            if(GAMESESSIONS[gameID] != undefined)
            {
                console.log("socket room exists");
                socket.join("room-" + gameID);
                socket.to("room-" + gameID).emit("player join", {
                    players : GAMESESSIONS[gameID].players
                });
            }
            else
            {
                console.log("socket room does not exist");
            }
        })

        socket.on("send controls", function(data){
            console.log("recieved controls");
            console.log(data);

            if(data.playerID == 1)
            {
                socket.to("room-" + data.gameID).broadcast.emit("player 1 controls", data.control);
            }
            else if(data.playerID == 2)
            {
                socket.to("room-" + data.gameID).broadcast.emit("player 2 controls", data.control);
            }
        })

        socket.on("start game", function(data){
            socket.to("room-" + data.gameID).broadcast.emit("start game");
        })

        socket.on("restart game", function(data){
          socket.to("room-" + data.gameID).broadcast.emit("restart game");  
        })
    })



}



//url/createGame
router.get("/createGame", (req, res, next) => {

    
    var uniqueID = uniqid().slice(-5, -1);
    console.log("creating a game ", uniqueID);
    var lanes = shuffle(RANDOM_LANES);

    res.header("Content-type", "application/json");
    res.status(202).json({
        lanes: lanes,
        message : "Game Created",
        gameID : uniqueID,
        players: []
    })

    GAMESESSIONS[uniqueID] = {
        lanes: lanes,
        players: []
    }
})


router.get("/joinGame/:gameID", (req, res, next) => {
    const gameID = req.params.gameID;
    console.log("joining room client: ", gameID);

    var result;
    if(GAMESESSIONS[gameID] == undefined)
    {
        result = {
            lanes: null,
            gameID: null,
            gameExist: false,
            players: null
        }
    }
    else //the game room exists
    {
        console.log("and room exists");

        result = {
            lanes: GAMESESSIONS[gameID].lanes,
            gameID: gameID,
            gameExist: true,
            players: GAMESESSIONS[gameID].players
        };
    }

    res.header("Content-type", "application/json");
    res.status(202).json(result);
})


router.get("/joinGameMobile/:gameID", (req, res, next) => {
    const gameID = req.params.gameID;
    console.log("joining mobile client: ", gameID);

    if(GAMESESSIONS[gameID] != undefined)
    {
        console.log("room exists");
        var playerID = 0;

        if(GAMESESSIONS[gameID].players.includes("player-1"))
        {
            playerID = 2;
            GAMESESSIONS[gameID].players.push("player-2");
        }
        else
        {
            playerID = 1;
            GAMESESSIONS[gameID].players.push("player-1");
        }

        res.status(202).json({
            gameExist: true,
            playerID: playerID
        })
    }
    else
    {
        res.status(202).json({
            gameExist: false,
            playerID: null
        })
    }

})

module.exports.Game = router;
/*
//join a game through client
//url/joinGame
router.get("/joinGame/client/:gameID", (req, res, next) => {
    var gameID = req.params.gameID;

    console.log(`joining a game through client with game ID: ${gameID}`);
    
    if(GAMESESSIONS[gameID] == undefined)
    {
        res.header("Content-type", "application/json");
        res.status(200).json({
            message: "null"
        })
    }
    else
    {
        //connect to the session through client
        res.header("Content-type", "application/json");
        res.status(200).json({
            message: "connected",
            players: GAMESESSIONS[gameID].players
        })
    }
    
})
*/

/*
function Player(ID)
{
    this.move = '';
    this.ID = ID;
}
*/
//join a game through mobile
/*
router.get("joinGame/mobile/:gameID", (req, res, next) => {

    var gameID = req.params.gameID;
    var sessionIndex = findSession(gameID);
    
    console.log(`joining game through mobile with ID: ${gameID}`);

    if(sessionIndex == null)
    {
        res.status(200).json({
            message: "session does not exist"
        })
    }
    else
    {
        var player;
        
        if(GAMESESSIONS[sessionIndex].player.includes(1)) player = 2, GAMESESSIONS[sessionIndex].players[2] = new Player(2);
        else if(GAMESESSIONS[sessionIndex].player.includes(2)) player = 1, GAMESESSIONS[sessionIndex].players[1] = new Player(1);

        res.status(200).json({
            message : "connected",
            player: player
        })
    }

})
*/

//url/Game/{gameID}