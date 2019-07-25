

window.onload = function(){
    var jumpButton = document.getElementById("jump-button");
    var leftButton = document.getElementById("left-button");
    var rightButton = document.getElementById("right-button");



    jumpButton.onclick = () => {

        console.log("jump"); 
        postControls("u");
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
        var testControl = {
            move: control,
            playerID: 1
        }
        var url = new URL("http://localhost:4293/controlIO/mobile/1234");
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(testControl),
            headers :
            {
                "Content-Type" : "application/json"
            },
            statusMessage: `Sending controls for game ${1234}`
        }).then(res => res.json())
            .then(function(responseContent){
                console.log(responseContent);
            })
            .catch(error => console.error(error));
    }
}