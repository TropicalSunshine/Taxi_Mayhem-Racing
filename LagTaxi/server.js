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


//create net server listening for TCP req
//TCP SERVER
var server = net.createServer();

server.on("connection", function(socket){
    reqIP = socket.remoteAddress.substring(7); 
    if (checkID(reqIP)){
        var device = {  
            ID:deviceID, 
            IP:socket.remoteAddress.substring(7),
            DATA:''
        };
        deviceID += 1;
        devices.push(device);
    }
    var device = findID(reqIP);
    socket.setEncoding('utf8');
    socket.on('data', function(data){
        device.DATA = data;
        console.log(device.ID);
        console.log(device.IP);
        console.log(devices);
    })
})

server.listen(9001, function(){
    console.log(server.address());
})

//create http
//HTTP SERVER 

var app = express();
app.use(express.static(path.join(__dirname + '/public')));
app.get("/data", function(req, res){
    res.writeHeader(200, {"Content-Type": "text/plain"});
    res.end(JSON.stringify(devices));
})
app.listen(2498);