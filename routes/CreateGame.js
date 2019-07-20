const express = require("express");
const uniqid = require("uniqid");

const router = express.Router();

//url/createGAme
router.get("/", (req, res, next) => {
    res.header("Content-type", "application/json");
    res.status(202).json({
        message : "Game Created",
        sessionID : uniqid().slice(0, 4)
    })
})


module.exports.createGame = router;