import React from 'react';

import './App.css';
import Game from './Game.container';
import DealCards from './DealCards';
import Error from './Error';
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
        <DealCards>
          {(computer, player) => (
            <Game computer={computer} player={player} title="Supertrumpf" />
          )}
        </DealCards>
      </DarkMode.Provider>
    );
  }
}
