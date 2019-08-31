
import io from "socket.io-client";

export var socket = null;

export const connect = function()
{
    socket = io.connect(`http://${window.location.host}`, {
        path: "/controllerIO"
    })

    console.log("joining room");

    socket.emit("join room client", {
        ID: sessionStorage.gameID
    })

    console.log("connected");
}

export const startGame = function()
{
    socket.emit("start game",  {
        ID: sessionStorage.gameID
    })
}

export const restartGame = function()
{
    socket.emit("restart game", {
        ID:sessionStorage.gameID
    })
};