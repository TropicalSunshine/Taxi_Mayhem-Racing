import React, { Component } from 'react'
import "./Menu.css";
import { HOSTURL } from './hostURL';




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
                sessionStorage.ID = responseContent.sessionID;
                that.gameID = responseContent.sessionID;
                //change the state of the output
                that.setState({
                    isWaitingRoom: true,
                    isJoinGame: false,
                    players: responseContent.players
                })
                
            })
            .catch(error => console.error(error));
    }

    JoinGame(gameID)
    {
        var that = this;
        //asks the user for the game code

        //parse server to join a game game
        //user is put in that waiting room
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
    }

    startGame()
    {
        window.open("http://localhost:4293/app", "_self");
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
        var startGame = this.state.isWaitingRoom ? <button onClick = {this.startGame}>Start Game</button> : '';

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
                        <button className = "menu-button-item" onClick = {this.CreateGame}>Create Game</button>
                        <button className = "menu-button-item" onClick = {() => 
                        {
                            that.setState({
                                isWaitingRoom: that.state.isWaitingRoom,
                                isJoinGame: true,
                                players: that.state.players
                            })
                        }}>Join Game</button>
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