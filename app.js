const express = require("express");
const cors =  require("cors");
const path = require("path");

const app = express();

//handle cors errors
app.use(cors());



//main page
app.use('/', express.static(path.join(__dirname + '/public/Game')));



//if no routes are found
app.use((req, res, next) => {
    res.writeHeader(404, {
        "Content-Type" : "text/plain"
    })
    res.status(404).end("No Route Found");
})


module.exports = app;