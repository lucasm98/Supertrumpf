import React from 'react';

import './App.css';
import Game from './Game.container';
import withCards from './withCards';

const GameWithCards = withCards(Game);

export default function App() {
  return <GameWithCards title="Supertrumpf" />;
}
