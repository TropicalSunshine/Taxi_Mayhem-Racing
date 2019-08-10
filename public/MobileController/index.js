const hostURL = "https://boga.localtunnel.me";

window.onload = function(){
    
    var socket = io.connect(hostURL, {
        path: "/controllerIO"
    });

    var connectButton = document.getElementById("connect-button");

    connectButton.onclick = () => {
        var gameID = document.getElementById("123").value;
        localStorage.gameID = gameID;
        socket.emit("join room mobile", {
            ID: gameID
        })
    }

    socket.on("join room mobile", function(data){
        console.log(data);
        if(data.gameExist)
        {
            connectButton.style.opacity = 0;
            connectButton.style.hidden = true;
            document.getElementById("status").innerHTML = "Connected";
            localStorage.playerID = data.playerID;
        }
        else
        {
            document.getElementById("status").innerHTML = "Error Game Does not exist";
        }
    })



    var jumpButton = document.getElementById("jump-button");
    var leftButton = document.getElementById("left-button");
    var rightButton = document.getElementById("right-button");


    jumpButton.onclick = () => {
        console.log("jump"); 
        postControls("j");
    }

    leftButton.onclick = () => {
        console.log("left");
        postControls("l");
    }

    rightButton.onclick = () => {
        console.log("right");
        postControls("r");
    }


    function postControls(control)
    {
        socket.emit("send controls", {
            control: control,
            playerID: localStorage.playerID,
            gameID: localStorage.gameID
        })
    }
}