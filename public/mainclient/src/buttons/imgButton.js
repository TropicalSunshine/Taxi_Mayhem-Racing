import React, { Component } from 'react'
import "./imgButton.css"

export default class ImgButton extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        var that = this;
        return (
            <div className = "img-button" style = {{
                height: that.props.height,
                width: that.props.width
            }}>
                <img src = {this.props.img} onClick = {this.props.event} width = {this.props.width} height = {this.props.height}></img>
            </div>
        )
    }
}
