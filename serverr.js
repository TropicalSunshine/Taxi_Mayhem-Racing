const http = require("http");
const app = require('./app');

var socket = require("socket.io");

const port = 4293;
const server = http.createServer(app);

const io = socket(server, {
    path: "/controllerIO",
    pingTimeout: 5000
});

require("./routes/ControllerIO")(io);

server.listen(port); 

console.log(`listening on port ${port}......`);