

window.onload = function(){
    var jumpButton = document.getElementById("jump-button");
    var leftButton = document.getElementById("left-button");
    var rightButton = document.getElementById("right-button");

    var socket = io.connect("http://localhost:4293", {
        path: "/controllerIO"
    });


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
        socket.emit("input", {
            control: control
        })
    }
}