import React from 'react';

import Card from './Card';
import './Game.css';
import useCards from './useCards';

interface Props {
  title: string;
}

export default function Game({ title }: Props) {
  const [state, play] = useCards();

  const infoStyles = {
    color: state.playersTurn ? 'black' : 'darkgrey',
    backgroundColor: state.playersTurn ? 'lightyellow' : 'white',
  };

  return (
    <>
      <h1>{title}</h1>
      <div className="info" style={infoStyles}>
        {state.playersTurn ? 'Du bist' : 'Der Computer ist'} an der Reihe
      </div>
      <div className="cards" data-testid="cards-container">
        {state.player[0] && (
          <div>
            <h1>{state.player.length}</h1>
            <Card
              animal={state.player[0]}
              uncovered={true}
              selectedProperty={state.selectedProperty}
              onSelectProperty={play}
            />
          </div>
        )}
        {state.computer[0] && (
          <div>
            <h1>{state.computer.length}</h1>
            <Card
              animal={state.computer[0]}
              uncovered={state.computerUncovered}
              selectedProperty={state.selectedProperty}
            />
          </div>
        )}
      </div>
    </>
  );
}