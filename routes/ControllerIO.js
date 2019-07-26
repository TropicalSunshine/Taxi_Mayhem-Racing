
const express = require("express");
const router = express.Router();

const SESSIONS = require("./Game").sessions;

const SessionIndex = {} //for memorization


var controls = {
    player1: "",
    player2: ""
}


module.exports = function(io)
{
    io.on("connection", (socket) => {
        console.log(socket.id); 

        socket.on("input", function(data){
            console.log(data);  
        })
    })

}









/*
//controller inputs
router.post("/mobile/:gameID", (req, res, next) => {
    //get the player number
    //assign player number to correct output
    var gameID = req.params.gameID;
    var move = req.body.move;
    var playerID = req.body.playerID;

    console.log(move);
    
    
    for(let i = 0; i < SESSIONS.length; i++)
    {
        if(SESSIONS[i].sessionID == gameID)
        {
            SessionIndex[gameID] = i;
            SESSIONS[i].players[playerID].move = move;
        }
    }
    
    
    controls.player1 = move;
    res.status(200).json({
        message: "recieved"
    })
    
})

//controller exports
router.get("/client/:gameID", (req, res, next) =>{
    var gameID = req.params.gameID;

    
    if(SessionIndex[gameID] == undefined)
    {
        res.header("Content-type", "application/json");
        res.status(200).json({
            player1: "",
            player2: ""
        })
    }
    else
    {
        var Player1Move = SESSIONS[SessionIndex[gameID]].players[1].move;
        var Player2Move = SESSIONS[SessionIndex[gameID]].players[2].move;

        res.header("Content-type", "application/json");
        res.status(200).json({
            player1: Player1Move,
            player2: Player2Move
        })
    }
    

    res.header("Content-type", "application/json");
    res.status(200).json(controls)

})
*/


module.exports.controllerIO = router;
