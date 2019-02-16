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

var devices = [];
var deviceID = 0;
var deviceData = '';

function checkID(IP){
    for(let d = 0; d<devices.length(); d++){
        if(devices[d].IP == IP){
            return false;
        }
    }
    return true;
}



//create net server listening for TCP req
//TCP SERVER
var server = net.createServer();

server.on("connection", function(socket){
    reqIP = socket.remoteAddress.substring(7); 
    if (checkID(reqIP)){

    }
    else{
        var device = {  ID:deviceID, 
            IP:socket.remoteAddress.substring(7),
            DATA:''
        };
    }
    console.log(device.ID);
    console.log(device.IP);
    console.log(device);
    socket.setEncoding('utf8');
    socket.on('data', function(data){
        device.DATA = data;
        console.log(data);
    })
    devices.push(device);
})

server.listen(9001, function(){
    console.log(server.address());
})

//create http
//HTTP SERVER   
fs.readFile('../index.html',controller = (err, html)=>{
    const webServer = http.createServer(function(req, resp) {  
        if (err){
            resp.writeHeader(404);
            resp.end();
        }  
        else if (req.url == '/data'){
            resp.writeHeader(200, {"Content-Type": "text/plan"});
            resp.end(deviceData);
        }
        else{
            resp.writeHeader(200, {"Content-Type": "text/html"});
            resp.write(html); 
            resp.end();
        }
    })
    webServer.listen(2498);
})
