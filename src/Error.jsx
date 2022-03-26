import React from 'react';
import DealCards from './DealCards';
import Game from './Game.container';

export default class Error extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch( error, info) {
    console.log(error, JSON.stringify(info));
  }

  static getDerivedStateFromError(error) {
    return {
      error: error.message,
    };
  }

  render() {
    if (this.state.error) {
      return <div>Ein Fehler ist aufgetreten: {this.state.error}</div>;
    } else {
      return (
        <div>
          <DealCards>
            {(computer, player) => (
              <Game computer={computer} player={player} title="Supertrumpf" />
            )}
          </DealCards>
        </div>
      );
    }
  }
}