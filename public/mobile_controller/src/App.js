import React from 'react';
import logo from './logo.svg';
import MainHub from './MainHub.js';
import './App.css';

function App() {
  const AppStyle = {
    height: "100%",
    width: "100%"
  }
  return (
    <div id = "controller-background" style = {AppStyle}>
      <MainHub/>
    </div>
  );
}

export default App;
