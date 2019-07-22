import React, { Component } from 'react'
import "./Menu.css";





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


        this.gameID = null;
    }

    CreateGame()
    {
        //parse server to create a game
        //user is put into the waiting room
        var that = this;
        var url = new URL("http://localhost:4293/game/createGame");
        fetch(url, {
            method: 'POST',
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
                sessionStorage.ID = responseContent.gameID;

                //change the state of the output
                that.setState({
                    isWaitingRoom: false,
                    isJoinGame: false,
                    players: responseContent.players
                })
                
            })
            .catch(error => console.error(error));
    }

    JoinGame()
    {
        //asks the user for the game code

        //parse server to join a game game
        //user is put in that waiting room
        var url = new URL(`http://localhost:4293//joinGame/client/${123}`);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(),
            headers :
            {
                "Content-Type" : "application/json"
            },
            statusMessage: `Sending controls for game ${1234}`
        }).then(res => res.json())
            .then(function(responseContent){
                console.log(responseContent);
            })
            .catch(error => console.error(error));
    }

    startGame()
    {
        window.open("http://localhost:4293/app");
    }


    render() {

        var that = this;
        var waitingRoom = this.state.isWaitingRoom ? <WaitingRoom players = {this.state.players}/> : '';

        //prompts the user to go back to the old screen
        var backButton = this.state.isWaitingRoom || this.state.isJoinGame ? <button onClick = {() => {
            that.setState({
                isWaitingRoom: false,
                isJoinGame: false,
                players: that.state.players
            })
        }}>Back</button> : '';
        var startGame = this.state.isWaitingRoom ? <button>Start Game</button> : '';

        var ID = "join-textinput" + Math.random();

        var inputID = this.state.isJoinGame ? (
            <div>
                <input id = {ID} type = "text" name = "gameID" placeholder = "Enter the Game ID"></input>
                <button>Join</button>
            </div>
        ) : '';

        if(that.state.isWaitingRoom || that.state.isJoinGame) 
        {
            return(
                <div id = "Menu">
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
                        <button className = "menu-button-item">Create Game</button>
                        <button className = "menu-button-item" onClick = {() => 
                        {
                            that.setState({
                                isWaitingRoom: that.state.isWaitingRoom,
                                isJoinGame: true,
                                players: that.state.players
                            })
                        }}>Join Game</button>
                    </div>
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