import React, { Component } from 'react';
import Control from "./Control.js";
import Left from "./images/left.png";
import Right from "./images/right.png";
import Jump from "./images/jump.png";
import "./ControllerHub.css";

export default class ControllerHub extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        var that = this;
        return (
            <div id = "controller-hub" onMouseDown = {() =>{
                return false;
            }}>
                <Control 
                socket = {this.props.socket}
                control = "l"
                image = {Left}/>
                <Control 
                socket = {this.props.socket}
                control = "r"
                image = {Right}/>
                <Control 
                socket = {this.props.socket}
                control = "j"
                image = {Jump} />
            </div>
        )
    }
}
