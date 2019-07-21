
const express = require("express");
const router = express.Router();

const SESSIONS = require("./Game").sessions;


//controller inputs
router.post("/:gameID", (req, res, next) => {
    //get the player number
    //assign player number to correct output
})

//controller exports
router.get("/:gameID", (req, res, next) =>{

})



module.exports.controllerIO = router;
