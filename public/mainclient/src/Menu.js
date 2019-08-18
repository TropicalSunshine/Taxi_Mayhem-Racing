import React, { Component } from 'react'
import ImgButton from "./buttons/imgButton.js";

import create_game_button from "./images/button_create_game.png";
import join_game_button from "./images/button_join_game.png";

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

        that.socket.on("join room client", function(data){
            if(data.gameExist)
            {
                localStorage.gameID = data.gameID;
                that.gameID = data.gameID;
                that.setState({
                    isWaitingRoom: true,
                    isJoinGame: false,
                    players: data.players
                })
                that.status = "";
            }
            else
            {
                that.status = "game does not exist"
            }
        })

        this.socket.on("start game", function(data) {
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
            body: JSON.stringify(),
            headers :
            {
                "Content-Type" : "application/json"
            },
            statusMessage: `Sending controls for game ${1234}`
        }).then(res => res.json())
            .then(function(responseContent){
                console.log(responseContent);
                
                //store the ID into the localbrowser client for the game
                localStorage.gameID = responseContent.gameID;
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
        var that = this;

        that.socket.emit("join room client", {
            ID: that.gameID
        })
        //asks the user for the game code

        //parse server to join a game game
        //user is put in that waiting room
        /*
        var url = new URL( HOSTURL + `/game/joinGame/client/${gameID}`);
        fetch(url, {
            method: 'GET',
            body: JSON.stringify(),
            headers :
            {
                "Content-Type" : "application/json"
            },
            statusMessage: `Sending controls for game ${1234}`
        }).then(res => res.json())
            .then(function(responseContent){

                if(responseContent.message === "connected")
                {
                    that.setState({
                        isWaitingRoom: true,
                        isJoinGame: false,
                        players: responseContent.players
                    })
                }
                else
                {
                    that.status = "incorrect game ID";
                }
            })
            .catch(error => console.error(error));
        */
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
            <button onClick = {() => {
                that.status = "";
                that.setState({
                    isWaitingRoom: false,
                    isJoinGame: false,
                    players: that.state.players
                })
            }}>Back</button>
        )
    }
    _renderInputBox()
    {
        var that = this;
        var joinbuttonID = "join-textinput" + Math.random();
        return (
            <div>
                <input id = {joinbuttonID} type = "text" name = "gameID" placeholder = "Enter the Game ID"></input>
                <button onClick = {() => {
                    that.gameID = document.getElementById(joinbuttonID).value
                    that.JoinGame(that.gameID)
                }}>Join</button>
            </div>
        )
    }
    render() {

        var that = this;

        var waitingRoom = this.state.isWaitingRoom && that._renderWaitingRoom();

        //prompts the user to go back to the old screen
        var backButton = (this.state.isWaitingRoom || this.state.isJoinGame) && that._renderBackButton();  

        //game button for when user is in waiting room
        var startGame = this.state.isWaitingRoom ? <button onClick = {() => {
            var that = this;
            this.startGame();
            this.socket.emit("start game", {
                ID: that.gameID
            })
        }}>Start Game</button> : '';

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
                    {backButton}
                </div>
            )
        }
        else
        {
            //add a input box
            return (
                <div id = "Menu">
                    <div>
                        <ImgButton img = {create_game_button} event = {that.CreateGame} 
                        width = "200px" height = "200px"/>
                        <ImgButton img = {join_game_button} event = {() => 
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
                    {backButton}
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