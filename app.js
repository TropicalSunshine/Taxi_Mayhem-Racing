const express = require("express");
const cors =  require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const GameRoute = require('./routes/Game');

//handle cors errors
app.use(cors());

app.use(bodyParser.json());

//client page
app.use('/', express.static(path.join(__dirname + '/public/Game')));

//mobile page
app.use("/mobile", express.static(path.join(__dirname + '/public/MobileClient')));

//Game

app.use("/game", GameRoute.Game);

//if no routes are found
app.use((req, res, next) => {
    res.writeHeader(404, {
        "Content-Type" : "text/plain"
    })
    res.status(404).end("No Route Found");
})

module.exports = app;