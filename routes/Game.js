const express = require("express");
const uniqid = require("uniqid");
const path = require("path");

const router = express.Router();

var GAMESESSIONS = {};

module.exports.controllerIO = function(io)
{

    io.on("connection", function(socket){
        socket.on("create game", function(data){
            console.log("creating game");
            socket.join("room-" + data.ID);
        })

        socket.on("join room client", function(data){
            console.log("joining room");
            var result;
            if(GAMESESSIONS[data.ID] == undefined)
            {
                result = {
                    gameExist: false
                }
            }
            else //the game room exists
            {
                console.log("and room exists");
                socket.join("room-" + data.ID);

                result = {
                    gameExist: true,
                    players: GAMESESSIONS[data.ID].players
                };
            }

            socket.emit("join room client",result);
        })


        socket.on("join room mobile", function(data){
            console.log("joining room mobile");
            console.log(data);
            if(GAMESESSIONS[data.ID] != undefined)
            {
                var playerID = 0;

                if(GAMESESSIONS[data.ID].players.includes("player-1"))
                {
                    playerID = 2;
                    GAMESESSIONS[data.ID].players.push("player-2");
                }
                else
                {
                    playerID = 1;
                    GAMESESSIONS[data.ID].players.push("player-1");
                }

                socket.join("room-" + data.ID);
                socket.to("room-" + data.ID).emit("player join", {
                    players : GAMESESSIONS[data.ID].players
                });
                socket.emit("join room mobile", {
                    gameExist: true,
                    playerID: playerID
                }); //true means the game session exists

            }
            else
            {
                socket.emit("join room mobile", {
                    gameExist: false,
                    playerID: null
                }); //false means the game session does not exist
            }
        })

        socket.on("send controls", function(data){
            if(data.ID == 1)
            {
                socket.broadcast.emit("player 1 controls", data.control);
            }
            else if(data.ID == 2)
            {
                socket.broadcast.emit("player 2 controls", data.control);
            }
        })
    })



}



//url/createGame
router.get("/createGame", (req, res, next) => {

    
    var uniqueID = uniqid().slice(-5, -1);
    console.log("creating a game " + uniqueID);
    res.header("Content-type", "application/json");
    res.status(202).json({
        message : "Game Created",
        gameID : uniqueID,
        players: []
    })

    GAMESESSIONS[uniqueID] = {
        players: []
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