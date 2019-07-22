const express = require("express");
const uniqid = require("uniqid");
const path = require("path");

const router = express.Router();

const GAMESESSIONS = {};


//url/createGame
router.get("/createGame", (req, res, next) => {

    console.log("creating a game");

    var uniqueID = uniqid().slice(0, 4);
    res.header("Content-type", "application/json");
    res.status(202).json({
        message : "Game Created",
        sessionID : uniqueID
    })

    GAMESESSIONS[uniqid] = {
        players: []
    }
})


//join a game through client
//url/joinGame
router.get("/joinGame/client/:gameID", (req, res, next) => {
    var gameID = req.params.gameID;

    console.log(`joining a game through client with game ID: ${gameID}`);
    
    if(GAMESESSIONS[gameID] == undefined)
    {
        res.header("Content-type", "application/json");
        res.status(200).json({
            message: "null",
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


function Player(ID)
{
    this.move = '';
    this.ID = ID;
}

//join a game through mobile
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

//url/Game/{gameID}

module.exports.Game = router;
module.exports.sessions = GAMESESSIONS;