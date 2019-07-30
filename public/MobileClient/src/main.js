import React, { Component } from 'react'
import io from "socket.io-client";

export default class main extends Component {
    constructor(props)
    {
        super(props);

        this.socket = io.connect("http://localhost:4293", {
            path: "/controllerIO"
        })
    }

    joinGame()
    {
        this.socket.emit("join game mobile")
    }

    render() {
        var id = "213";
        return (
            <div>
                <input type = "text"  id = {id} ></input>
                <button onClick = { () => {
                    document.getElementById(id).value
                }}></button>
            </div>
        )
    }
}
