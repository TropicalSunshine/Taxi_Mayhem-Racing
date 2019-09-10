import React, { Component } from 'react'
import ImgButton from "./buttons/imgButton.js";

import button_create_game from "./images/button_create_game.png";
import button_join_game from "./images/button_join_game.png";
import button_back from "./images/button_back.png";
import button_start from "./images/button_start.png";

import "./Menu.css";
import { HOSTURL } from './hostURL';
import io from "socket.io-client";


export default class Menu extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isWaitingRoom: false,
            isJoinGame: false,
            players: []
        }
        this.CreateGame = this.CreateGame.bind(this);
        this.JoinGame = this.JoinGame.bind(this);

        this.status = null;
        this.gameID = null;
        this.socket = io.connect(HOSTURL, {
            path: "/controllerIO"
        });

        //listening for players to join
        var that = this;
        this.socket.on("player join", function(data){
            console.log("player join");
            that.setState({
                isWaitingRoom: that.state.isWaitingRoom,
                isJoinGame: that.state.isJoinGame,
                players: data.players
            })
        })

        this.socket.on("start game client", function(data) {
            console.log("Starting game");
            that.startGame();
        })
    }

    CreateGame()
    {
        //parse server to create a game
        //user is put into the waiting room
        var that = this;
        var url = new URL( HOSTURL + "/game/createGame");
        fetch(url, {
            method: 'GET',
            body: null,
            headers :
            {
                "Content-Type" : "application/json"
            },
            statusMessage: `Creating game`
        }).then(res => res.json())
            .then(function(responseContent){
                console.log(responseContent);
                
                //store the ID into the localbrowser client for the game
                sessionStorage.lanes = responseContent.lanes;
                sessionStorage.gameID = responseContent.gameID;
                that.gameID = responseContent.gameID;
                //change the state of the output
                that.setState({
                    isWaitingRoom: true,
                    isJoinGame: false,
                    players: responseContent.players
                })

                that.socket.emit("join room client", {
                    ID: that.gameID
                })
                
            })
            .catch(error => console.error(error));
    }

    JoinGame(gameID)
    {
        console.log("clicked");
        var that = this;

        /*
        that.socket.emit("join room client", {
            ID: that.gameID
        })
        */
        //asks the user for the game code

        //parse server to join a game game
        //user is put in that waiting room
        var url = new URL( HOSTURL + `/game/joinGame/${gameID}`);
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
                    sessionStorage.lanes = responseContent.lanes;
                    sessionStorage.gameID = responseContent.gameID;
                    that.gameID = responseContent.gameID;
                    that.status = "";
                    that.setState({
                        isWaitingRoom: true,
                        isJoinGame: false,
                        players: responseContent.players
                    });

                    that.socket.emit("join room client", {
                        ID: that.gameID
                    })
                }
                else
                {
                    that.status = "incorrect game ID";
                }
            })
            .catch(error => console.error(error));
    }

    startGame()
    {
        window.open( HOSTURL + "/app", "_self");
    }

    _renderWaitingRoom()
    {
        var that = this;
        return (
        <div>
            <h5>please join game through mobile with code</h5>
            <h3>{this.gameID}</h3>
            <WaitingRoom players = {that.state.players}/>
        </div>
        )
    }

    _renderBackButton()
    {
        var that = this;
        return(
            <ImgButton img = {button_back} event = {() => {
                that.status = "";
                that.setState({
                    isWaitingRoom: false,
                    isJoinGame: false,
                    players: that.state.players
                })
            }} width = "200px" height = "200px" />
        )
    }
    _renderInputBox()
    {
        var that = this;
        var joinbuttonID = "join-textinput" + Math.random();
        return (
            <div>
                <input id = {joinbuttonID} type = "text" name = "gameID" placeholder = "Enter the Game ID"></input>
                <div className = "menu-buttons">
                    <ImgButton img = {button_join_game} event = {() => {
                        that.gameID = document.getElementById(joinbuttonID).value
                        that.JoinGame(that.gameID)
                    }} width = "200px" height = "200px"/>
                    {that._renderBackButton()}
                </div>
            </div>
        )
    }
    render() {

        var that = this;

        var waitingRoom = this.state.isWaitingRoom && that._renderWaitingRoom();

        //game button for when user is in waiting room
        var startGame = this.state.isWaitingRoom ? (
            <div className = "menu-buttons">
                <ImgButton img = {button_start} event = {() => {
                    var that = this;
                    this.startGame();

                    this.socket.emit("start game client", {
                        ID: that.gameID
                    })
                }} width = "200px" height = "200px" />
                {that._renderBackButton()}
            </div>
            ) : '';

        var joinbuttonID = "join-textinput" + Math.random();

        var inputID = this.state.isJoinGame && that._renderInputBox();






        if(that.state.isWaitingRoom || that.state.isJoinGame) 
        {
            return(
                <div id = "Menu">
                    {that.status}
                    {waitingRoom}
                    {startGame}
                    {inputID}
                </div>
            )
        }
        else
        {
            //add a input box
            return (
                <div id = "Menu">
                    <div className = "menu-buttons">
                        <ImgButton img = {button_create_game} event = {that.CreateGame} 
                        width = "200px" height = "200px"/>
                        <ImgButton img = {button_join_game} event = {() => 
                        {
                            that.setState({
                                isWaitingRoom: that.state.isWaitingRoom,
                                isJoinGame: true,
                                players: that.state.players
                            })
                        }} width = "200px" height = "200px"/>
                    </div>
                    {that.status}
                    {waitingRoom}
                    {startGame}
                    {inputID}
                </div>
            )
        }

    }
}


function WaitingRoom(props)
{
    var players = props.players.map((player, index) => <li key = {index} className = "Player-list-item">{player}</li>); // array of players in the room;

    return(
        <div id = "WaitingRoom">
            <ul>
                {players}
            </ul>
        </div>
    )
}