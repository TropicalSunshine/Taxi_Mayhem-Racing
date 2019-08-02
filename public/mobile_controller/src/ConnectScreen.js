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
                    this.props.socket.emit("join room mobile", {
                        ID: gameID
                    })
                }}>connect</button>
            </div>
        )
    }
}
