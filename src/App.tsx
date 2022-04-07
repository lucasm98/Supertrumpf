import React from 'react';

import './App.css';
import Game from './Game/Game';
import DarkMode from './Game/DarkMode';
import axios from "axios";
import Login from "./Login/Login";
import update from "immutability-helper";

interface State {
  darkMode: boolean;
  loggedIn: boolean;
  error: string;
}

export default class App extends React.Component<{}, State>{
  state = {
    darkMode: false,
    loggedIn: false,
    error: '',
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({darkMode: !prevState.darkMode}));
  };

  handelLogin = async (username: string, password: string) => {
    const result = await axios.post('http://localhost:3001/login', {
      username,
      password,
    });
    let loggedIn = false;
    let error = 'Anmeldung fehlgeschlagen';
    if(result.data === true) {
      loggedIn = true;
      error = '';
    }
    this.setState(prevState =>
      update(prevState, {
        loggedIn: {$set: loggedIn},
        error: {$set: error},
      })
    );
  };

  render() {
    return (
      <DarkMode.Provider value={this.state.darkMode}>
        {this.state.loggedIn && (
          <>
            <button onClick={this.toggleDarkMode}>Toggle Dark Mode</button>
            <Game title="Supertrumpf" />
          </>
        )}
        {!this.state.loggedIn && (
          <Login onLogin={this.handelLogin} error={this.state.error}/>
        )}
      </DarkMode.Provider>
    );
  }
}
