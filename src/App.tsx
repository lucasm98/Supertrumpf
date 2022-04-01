import React from 'react';

import './App.css';
import Game from './Game';
import DarkMode from './DarkMode';

interface State {
  darkMode: boolean;
}

export default class App extends React.Component<{}, State>{
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
