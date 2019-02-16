
var net = require('net');

var deviceIP;
var deviceData;

//create net server listening for TCP request
var server = net.createServer();

server.on("connection", function(socket){
    deviceIP = socket.remoteAddress;
    socket.setEncoding('utf8');
    console.log("new connection is made");
    socket.on('data', function(data){
        console.log(data);
    })
})

server.on("data", function(data){
    console.log(data);
    console.log(typeof(data));
})

server.listen(9001, function(){
    console.log(server.address());
})