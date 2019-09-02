import "./ConnectScreen.css";
import React, { Component } from 'react'

export default class ConnectScreen extends Component {
    constructor(props)
    {
        super(props);
    }
    render() {

        var inputConnectID = "connect123";

        return (
            <div id = "connect-screen-main" style = {
                {
                    top: (window.screen.height/2) - 20
                }
            }>
                <input 
                id = {inputConnectID}
                type = "text"></input>
                <button onClick = {() => {
                    var gameID = document.getElementById(inputConnectID).value;
                    sessionStorage.gameID = gameID;

                    //socket emiting to join that game room
                    this.props.action(gameID);
            
                    /*
                    that.socket.emit("join room client", {
                        ID: that.gameID
                    })
                    */
                    //asks the user for the game code
            
                    //parse server to join a game game
                    //user is put in that waiting room
                }}>connect</button>
            </div>
        )
    }
}
