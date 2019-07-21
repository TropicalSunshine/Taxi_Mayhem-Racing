const express = require("express");
const uniqid = require("uniqid");
const path = require("path");

const router = express.Router();

const GAMESESSIONS = [];


//url/createGame
router.get("/createGame", (req, res, next) => {
    var uniqueID = uniqid().slice(0, 4);
    res.header("Content-type", "application/json");
    res.status(202).json({
        message : "Game Created",
        sessionID : uniqueID
    })

    GAMESESSIONS.push({
        sessionID: uniqueID,
        players: []
    })
})


function findSession(gameID)
{
    //
    for(let i = 0; i < GAMESESSIONS.length; i++)
    {
        if(GAMESESSIONS[i].sessionID == gameID)
        {
            return i;
        }
    }

    return null;
}

//join a game through client
//url/joinGame
router.get("/joinGame/client/:gameID", (req, res, next) => {
    var gameID = req.params.gameID;

    var sessionIndex = findSession(gameID); 
    if(sessionIndex == null)
    {
        res.header("Content-type", "application/json");
        res.status(200).json({
            message: "session does not exist",
        })
    }
    else
    {
        //connect to the session through client
        res.header("Content-type", "application/json");
        res.status(200).json({
            message: "connected",
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
    
    if(sessionIndex == null)
    {
        res.status(200).json({
            message: "session does not exist"
        })
    }
    else
    {
        var player;
        if(GAMESESSIONS[sessionIndex].player.includes(1)) player = 2, GAMESESSIONS[sessionIndex].player.push(new Player(2));
        else if(GAMESESSIONS[sessionIndex].player.includes(2)) player = 1, GAMESESSIONS[sessionIndex].player.push(new Player(1));

        res.status(200).json({
            message : "connected",
            player: player
        })
    }

})

//url/Game/{gameID}

module.exports.createGame = router;
module.exports.sessions = GAMESESSIONS;