const express = require("express");
const cors =  require("cors");
const path = require("path");

const app = express();

const createGameRoute = require('./routes/CreateGame');

//handle cors errors
app.use(cors());



//client page
app.use('/', express.static(path.join(__dirname + '/public/Game')));

//mobile page
app.use("/mobile", express.static(path.join(__dirname + '/public/MobileClient')));

//Game

app.use("/createGame", createGameRoute.createGame);

//if no routes are found
app.use((req, res, next) => {
    res.writeHeader(404, {
        "Content-Type" : "text/plain"
    })
    res.status(404).end("No Route Found");
})

module.exports = app;