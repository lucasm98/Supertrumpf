import React from 'react';

import './App.css';
import Game from './Game';
import DarkMode from './DarkMode';

export default class App extends React.Component {
  state = {
    darkMode: false,
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({ darkMode: !prevState.darkMode}));
  };

  render() {
    return (
      <DarkMode.Provider value={this.state.darkMode}>
        <button onClick={this.toggleDarkMode}>Toggle Dark Mode</button>
        <Game title="Supertrumpf" />
      </DarkMode.Provider>
    );
  }
}
