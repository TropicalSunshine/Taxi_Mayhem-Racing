const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

var net = require('net');
var http = require('http');
var fs = require('fs');

var deviceIP;
var deviceData = 'w';

//create net server listening for TCP req

var server = net.createServer();

server.on("connection", function(socket){
    deviceIP = socket.remoteAddress;
    socket.setEncoding('utf8');
    socket.on('data', function(data){
        deviceData = data;
        console.log(data);
    })
})

server.listen(9001, function(){
    console.log(server.address());
})


//create http   
fs.readFile('../index.html',controller = (err, html)=>{
    const server = http.createServer(function(req, resp) {  
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
    server.listen(2498);
})
