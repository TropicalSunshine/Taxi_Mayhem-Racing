import React from 'react';
import title from "./images/title.png"
import Menu from './Menu';
import './App.css';

function App() {
  return (
    <div id="App">
      <img style = {{
        width: "400px",
        height: "200px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block "
      }}src = {title}></img>
      <Menu/>
    </div>
  );
}

export default App;
