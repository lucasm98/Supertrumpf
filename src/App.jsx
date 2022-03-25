import React from 'react';

import './App.css';
import Game from './Game.container';
import DealCards from './DealCards';

export default function App() {
  return (
    <DealCards>
      {(computer, player) => (
        <Game computer={computer} player={player} title="Supertrumpf" />
      )}
    </DealCards>
  );
}
