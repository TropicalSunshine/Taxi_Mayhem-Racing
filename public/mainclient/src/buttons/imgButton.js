import React, { Component } from 'react'
import "./imgButton.css"

export default class ImgButton extends Component {
    constructor(props)
    {
        super(props);

        var that = this; 
        this.state = {
            height: that.props.height,
            width: that.props.width
        }
    }

    render() {
        var that = this;
        var style = {
            height: that.state.height, 
            width: that.state.width
        }
        return (
            <div className = "img-button"
                style = {{
                    height: that.props.height,
                    width: that.props.width,
                    paddingLeft: "20px"
                }}>
                <img src = {this.props.img} onClick = {this.props.event} style = {style}
                    onMouseEnter = {() => {
                        that.setState({
                            height: "110%",
                            width: "110%"
                        })
                    }}
                    onMouseLeave = {() => {
                        that.setState({
                            height: that.props.height,
                            width: that.props.width
                        })
                    }}></img>
            </div>
        )
    }
}
