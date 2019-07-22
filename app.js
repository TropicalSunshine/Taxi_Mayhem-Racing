const express = require("express");
const cors =  require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const GameRoute = require('./routes/Game');
const ControllerIORoute = require("./routes/ControllerIO");

//handle cors errors
app.use(cors());

app.use(bodyParser.json());

//client page
app.use('/', express.static(path.join(__dirname + '/public/mainclient/build')));

//mobile page
//must be named index.html
app.use("/mobile", express.static(path.join(__dirname + '/public/MobileClient')));

//game page
app.use("/app",  express.static(path.join(__dirname + '/public/Game')));


//Game
app.use("/game", GameRoute.Game);
app.use("/controlIO", ControllerIORoute.controllerIO);

//if no routes are found
app.use((req, res, next) => {
    res.writeHeader(404, {
        "Content-Type" : "text/plain"
    })
    res.status(404).end("No Route Found");
})

module.exports = app;