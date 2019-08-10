import "./Control.css";
import React, { Component } from 'react'

export default class Control extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        var that = this;
        return (
            <div className = "control">
                <img 
                width = "60%"
                height = "60%"
                src = {this.props.image} 
                onClick = {() => {
                    console.log(this.props.control)
                    that.props.socket.emit("send controls", {
                        control: this.props.control,
                        playerID: sessionStorage.playerID,
                        gameID : sessionStorage.gameID
                    })
                }}></img>
            </div>
        )
    }
}
