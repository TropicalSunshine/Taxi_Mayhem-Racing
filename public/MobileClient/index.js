

window.onload = function(){
    var jumpButton = document.getElementById("jump-button");
    var leftButton = document.getElementById("left-button");
    var rightButton = document.getElementById("right-button");



    jumpButton.onclick = () => {
        var socket = io("http://localhost:4293");
        console.log("jump");
    }

    leftButton.onclick = () => {
        console.log("left");
    }

    rightButton.onclick = () => {
        console.log("right");
    }
}