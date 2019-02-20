const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

//required libaries 
var net = require('net');
var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var c = require('crypto');

var devices = [];
var deviceID = 0;
var deviceData = '';

//checks that ID to see if it already exists
function checkID(IP){
    for(let d = 0; d<devices.length; d++){
        if(devices[d].IP == IP){
            return false;
        }
    }
    return true;
}

//finds device with that IP
function findID(IP){
    for(let d = 0;d < devices.length;d++){
        if (devices[d].IP == IP){
            return devices[d];
        }
    }
}


//create net Server listening for TCP req
//TCP Server
var socketServer = net.createServer();

socketServer.on("connection", function(socket){
    reqIP = socket.remoteAddress.substring(7); 
    if (checkID(reqIP)){
        var device = {  
            ID:deviceID, 
            IP:socket.remoteAddress.substring(7),
            DATA:'',
            unique: ''
        };
        deviceID += 1;
        devices.push(device);
    }
    var device = findID(reqIP);
    socket.setEncoding('utf8');
    socket.on('data', function(data){
        var uniqueID = c.randomBytes(10).toString('hex');
        device.DATA = data;
        for(let i = 0; i<devices.length; i++){
            if(devices[i].ID == device.ID){
                devices[i].unique = uniqueID;
            }
        }
        console.log(devices);
    })
})

socketServer.listen(9001, function(){
    console.log("TCP server listening on port 9001.....");
})

//create http
//HTTP Server 
var app = express();
app.use(express.static(path.join(__dirname + '/public')));
app.get("/data", function(req, res){
    res.writeHeader(200, {"Content-Type": "text/plain"});
    res.end(JSON.stringify(devices));
})



//--Google Cloud----

var webserver = app.listen(process.env.PORT || '2498', function(){
    console.log(`Web Server listening on ${webserver.address().port}`)
})

//app.listen(2498)