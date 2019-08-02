import React from 'react';
import logo from './logo.svg';
import MainHub from './MainHub.js';
import './App.css';

function App() {
  const AppStyle = {
    height: window.screen.height,
    width: window.screen.width
  }
  return (
    <div id = "controller-background" style = {AppStyle}>
      <MainHub/>
    </div>
  );
}

export default App;
