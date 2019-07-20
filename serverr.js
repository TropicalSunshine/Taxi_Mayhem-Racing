const http = require("http");
const app = require('./app');


const port = 4293;
const server = http.createServer(app);

var socket = require("socket.io")(server);

socket.on('connection', (socket) => {
    console.log("a user has connected");
    socket.on("buttonInput", function(data) {
        console.log(data)
    })
})

server.listen(port);

console.log(`listening on port ${port}......`);