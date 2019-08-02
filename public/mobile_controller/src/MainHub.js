import React, { Component } from 'react'
import {hostURL} from "./hostURL.js";
import ConnectScreen from "./ConnectScreen.js";
import ControllerHub from "./ControllerHub.js";
import io from "socket.io-client";

export default class MainHub extends Component {
    constructor(props)
    {
        super(props);

        var that = this;
        this.status = null;
        this.state = {
            isConnectScreen: false,
            isControllerScreen: true
        }

        //initial socket attempt to conenct to main host
        this.socket = io.connect(hostURL, {
            path: "/controllerIO"
        })

        //listening to return "join room mobile" event
        this.socket.on("join room mobile", function(data){
            console.log(data);
            if(data.gameExist)
            {
                that.status = "Connected";
                sessionStorage.playerID = data.playerID;
                that.setState({
                    isConnectScreen: false, 
                    isControllerScreen: true
                })
            }
            else
            {
                that.status = "Error Game Does not exist";
            }
        })
    }

    _renderConnectScreen()
    {
        return (
            <ConnectScreen socket = {this.socket} />
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
               {that.status && !that.state.isConnectScreen}
               {controllerHub} 
            </div>
        )
    }
}
