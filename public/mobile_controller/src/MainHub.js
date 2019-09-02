import React, { Component } from 'react'
import {hostURL} from "./hostURL.js";
import "./ConnectScreen.css";
import ControllerHub from "./ControllerHub.js";
import io from "socket.io-client";

export default class MainHub extends Component {
    constructor(props)
    {
        super(props);

        var that = this;
        this.status = null;
        this.state = {
            isConnectScreen: true,
            isControllerScreen: false
        }

        this._connect.bind(this);
        //initial socket attempt to conenct to main host
        this.socket = io.connect(hostURL, {
            path: "/controllerIO"
        })

        
    }
    _connect(gameID)
    {
        var that = this;
        var url = new URL( hostURL + `/game/joinGameMobile/${gameID}`);
        fetch(url, {
            method: 'GET',
            body: null  ,
            headers :
            {
                "Content-Type" : "application/json"
            },
            statusMessage: `attempting to join game ${gameID}`
        }).then(res => res.json())
            .then(function(responseContent){
                console.log(responseContent);
                if(responseContent.gameExist)
                {
                    that.status = "Connected";
                    sessionStorage.playerID = responseContent.playerID;
                    that.setState({
                        isConnectScreen: false, 
                        isControllerScreen: true
                    })
                }
                else
                {
                    that.status = "Error Game Does not exist";
                }

                that.socket.emit("join room mobile", {
                    ID: gameID
                })
            })
            .catch(error => console.error(error));

    }

    _renderConnectScreen()
    {

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
                    this._connect(gameID);
            
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
    
    _renderControllerHub()
    {
        return (
            <ControllerHub socket = {this.socket}/>
        )
    }

    render() {
        var that = this;
        var connectScreen = this.state.isConnectScreen && that._renderConnectScreen();
        var controllerHub = this.state.isControllerScreen && that._renderControllerHub();

        return (
            <div>
               {connectScreen}
               {that.status && that.state.isConnectScreen}
               {controllerHub} 
            </div>
        )
    }
}
